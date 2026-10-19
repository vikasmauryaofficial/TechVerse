import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

type Channel = "VMA" | "VCS";

interface YouTubeVideo {
  videoId: string;
  title: string;
  publishedDate: string;
  channel: Channel;
}

interface YouTubeApiResponse<T> {
  items?: T[];
  error?: { message?: string };
}

async function fetchYouTubeApi<T>(resource: string, params: Record<string, string>): Promise<YouTubeApiResponse<T>> {
  const apiKey = Deno.env.get("YOUTUBE_API_KEY");
  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY is not configured for the youtube-feed function.");
  }

  const url = new URL(`https://www.googleapis.com/youtube/v3/${resource}`);
  url.search = new URLSearchParams({ ...params, key: apiKey }).toString();
  const response = await fetch(url);
  const result = await response.json() as YouTubeApiResponse<T>;

  if (!response.ok) {
    throw new Error(result.error?.message || `YouTube Data API request failed (${response.status}).`);
  }

  return result;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return Response.json({ error: "Method not allowed." }, { status: 405, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: settings, error: settingsError } = await supabase
      .from("site_settings")
      .select("vma_channel_id, vcs_channel_id")
      .eq("id", 1)
      .maybeSingle();
    if (settingsError) throw settingsError;

    const url = new URL(req.url);
    const requestedChannel = url.searchParams.get("channel");
    if (requestedChannel && requestedChannel !== "VMA" && requestedChannel !== "VCS") {
      return Response.json({ error: "channel must be VMA or VCS." }, { status: 400, headers: corsHeaders });
    }

    const channels: { id: string; name: Channel }[] = [];
    if (!requestedChannel || requestedChannel === "VMA") {
      channels.push({ id: settings?.vma_channel_id || "UCf7mlPgA3jG5r0t8u7NyRPg", name: "VMA" });
    }
    if (!requestedChannel || requestedChannel === "VCS") {
      channels.push({ id: settings?.vcs_channel_id || "UCrrr6PjNuPDAd_Yo0hwv73Q", name: "VCS" });
    }

    const requestedMax = Number.parseInt(url.searchParams.get("max") || "12", 10);
    const maxResults = Number.isFinite(requestedMax) ? Math.min(Math.max(requestedMax, 1), 50) : 12;
    const resource = url.searchParams.get("resource") || "videos";

    if (resource === "playlists") {
      const results = await Promise.all(channels.map(async (channel) => {
        const response = await fetchYouTubeApi<{
          id: string;
          snippet?: {
            title?: string;
            description?: string;
            thumbnails?: { medium?: { url?: string }; default?: { url?: string } };
          };
          contentDetails?: { itemCount?: number };
        }>("playlists", {
          part: "snippet,contentDetails",
          channelId: channel.id,
          maxResults: String(maxResults),
        });

        return (response.items || []).map((item) => ({
          playlistId: item.id,
          title: item.snippet?.title || "Untitled playlist",
          description: item.snippet?.description || "",
          thumbnailUrl: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || "",
          videoCount: item.contentDetails?.itemCount || 0,
          channel: channel.name,
        }));
      }));

      return Response.json({ playlists: results.flat() }, { headers: corsHeaders });
    }

    if (resource === "playlistVideos") {
      const playlistId = url.searchParams.get("playlistId");
      if (!playlistId) {
        return Response.json({ error: "playlistId is required." }, { status: 400, headers: corsHeaders });
      }
      if (!requestedChannel) {
        return Response.json({ error: "channel is required when loading playlist videos." }, { status: 400, headers: corsHeaders });
      }

      const channel = channels[0];
      const response = await fetchYouTubeApi<{
        snippet?: { title?: string; publishedAt?: string };
        contentDetails?: { videoId?: string };
      }>("playlistItems", {
        part: "snippet,contentDetails",
        playlistId,
        maxResults: String(maxResults),
      });

      const videos = (response.items || []).flatMap((item): YouTubeVideo[] => {
        const videoId = item.contentDetails?.videoId;
        return videoId ? [{
          videoId,
          title: item.snippet?.title || "Untitled video",
          publishedDate: item.snippet?.publishedAt || "",
          channel: channel.name,
        }] : [];
      });

      return Response.json({ videos }, { headers: corsHeaders });
    }

    if (resource !== "videos") {
      return Response.json({ error: "resource must be videos, playlists, or playlistVideos." }, { status: 400, headers: corsHeaders });
    }

    const channelResponse = await fetchYouTubeApi<{
      id: string;
      contentDetails?: { relatedPlaylists?: { uploads?: string } };
    }>("channels", {
      part: "contentDetails",
      id: channels.map((channel) => channel.id).join(","),
    });

    const uploadsPlaylists = new Map(
      (channelResponse.items || []).map((item) => [
        item.id,
        item.contentDetails?.relatedPlaylists?.uploads,
      ]),
    );
    const perChannelLimit = requestedChannel ? maxResults : Math.ceil(maxResults / channels.length);

    const results = await Promise.all(channels.map(async (channel) => {
      const uploadsPlaylistId = uploadsPlaylists.get(channel.id);
      if (!uploadsPlaylistId) {
        throw new Error(`Could not find the uploads playlist for ${channel.name}. Check its channel ID in site settings.`);
      }

      const response = await fetchYouTubeApi<{
        snippet?: { title?: string; publishedAt?: string };
        contentDetails?: { videoId?: string };
      }>("playlistItems", {
        part: "snippet,contentDetails",
        playlistId: uploadsPlaylistId,
        maxResults: String(perChannelLimit),
      });

      return (response.items || []).flatMap((item): YouTubeVideo[] => {
        const videoId = item.contentDetails?.videoId;
        return videoId ? [{
          videoId,
          title: item.snippet?.title || "Untitled video",
          publishedDate: item.snippet?.publishedAt || "",
          channel: channel.name,
        }] : [];
      });
    }));

    const videos = results.flat().sort((a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );

    return Response.json({ videos: videos.slice(0, maxResults) }, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load YouTube content.";
    const status = message.includes("YOUTUBE_API_KEY") ? 503 : 502;
    return Response.json({ error: message }, { status, headers: corsHeaders });
  }
});
