import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  fetchSiteSettings,
  fetchYouTubePlaylistVideos,
  fetchYouTubePlaylists,
  fetchYouTubeVideos,
  type YouTubePlaylistItem,
  type YouTubeVideoItem,
  type DBSiteSettings,
  type Channel,
} from '@/lib/supabase';
import { ChBadge } from '@/components/ui';

export function VideosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const channel = (searchParams.get('channel') as Channel | null) || 'All';
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string; channel: Channel } | null>(null);
  const [ytVideos, setYtVideos] = useState<YouTubeVideoItem[]>([]);
  const [playlists, setPlaylists] = useState<YouTubePlaylistItem[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<YouTubePlaylistItem | null>(null);
  const [playlistVideos, setPlaylistVideos] = useState<YouTubeVideoItem[]>([]);
  const [settings, setSettings] = useState<DBSiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [playlistsLoading, setPlaylistsLoading] = useState(true);
  const [playlistVideosLoading, setPlaylistVideosLoading] = useState(false);
  const [playlistsError, setPlaylistsError] = useState('');
  const [playlistVideosError, setPlaylistVideosError] = useState('');
  const playlistRequestId = useRef(0);

  useEffect(() => {
    fetchSiteSettings().then(setSettings).catch(() => {});
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    fetchYouTubeVideos(channel === 'All' ? undefined : channel, 12)
      .then((v) => { if (active) setYtVideos(v); })
      .catch((e) => { if (active) setError(e.message || 'Failed to load videos'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [channel]);

  useEffect(() => {
    let active = true;
    playlistRequestId.current += 1;
    setPlaylistsLoading(true);
    setPlaylistsError('');
    setSelectedPlaylist(null);
    setPlaylistVideos([]);
    fetchYouTubePlaylists(channel === 'All' ? undefined : channel)
      .then((items) => { if (active) setPlaylists(items); })
      .catch((e) => { if (active) setPlaylistsError(e.message || 'Failed to load playlists'); })
      .finally(() => { if (active) setPlaylistsLoading(false); });
    return () => { active = false; };
  }, [channel]);

  const handlePlaylistSelect = async (playlist: YouTubePlaylistItem) => {
    const requestId = ++playlistRequestId.current;
    setSelectedPlaylist(playlist);
    setPlaylistVideos([]);
    setPlaylistVideosError('');
    setPlaylistVideosLoading(true);
    try {
      const items = await fetchYouTubePlaylistVideos(playlist.playlistId, playlist.channel);
      if (requestId === playlistRequestId.current) setPlaylistVideos(items);
    } catch (e) {
      if (requestId === playlistRequestId.current) {
        setPlaylistVideosError(e instanceof Error ? e.message : 'Failed to load playlist videos.');
      }
    } finally {
      if (requestId === playlistRequestId.current) setPlaylistVideosLoading(false);
    }
  };

  const subInfo: Record<Channel, { name: string; url: string; subs: string }> = {
    VMA: {
      name: 'Vikas Maurya Academy',
      url: 'https://www.youtube.com/@VikasMauryaAcademy',
      subs: settings?.vma_subscribers || '6.85K subscribers',
    },
    VCS: {
      name: 'Vikas Coding School',
      url: 'https://www.youtube.com/@VikasCodingSchool',
      subs: settings?.vcs_subscribers || '6.87K subscribers',
    },
  };

  return (
    <div>
      <section className="text-center py-16 px-4" style={{ background: 'linear-gradient(135deg, #FCE4EC 0%, #FFF3E0 100%)' }}>
        <h1 className="font-display font-extrabold text-text" style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>Videos</h1>
        <p className="text-muted text-lg mt-2">Latest videos and playlists from both channels</p>
      </section>

      {/* Channel subscribe bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-3">
          {(['VMA', 'VCS'] as Channel[]).map((ch) => {
            const info = subInfo[ch];
            return (
              <a
                key={ch}
                href={info.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg border border-border bg-bg px-4 py-2.5 hover:border-red hover:shadow-soft transition-all group"
              >
                <span className="text-xl">{ch === 'VMA' ? '📚' : '💻'}</span>
                <div className="text-left">
                  <div className="text-sm font-semibold text-text group-hover:text-red transition-colors">{info.name}</div>
                  <div className="text-xs text-muted">{info.subs}</div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-red px-2.5 py-1 text-xs font-semibold text-white ml-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  Subscribe
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Channel filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['All', 'VMA', 'VCS'].map((tab) => {
            const label = tab === 'All' ? 'All Videos' : tab === 'VMA' ? '📚 Vikas Maurya Academy' : '💻 Vikas Coding School';
            const active = channel === tab;
            return (
              <button
                key={tab}
                onClick={() => { setSearchParams(tab === 'All' ? {} : { channel: tab }); setSelectedVideo(null); }}
                className={`pill-tab ${active ? 'pill-tab-active' : 'pill-tab-idle'}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Featured video player */}
        {selectedVideo && (
          <div className="mb-8 animate-fadeUp">
            <div className="rounded-xl overflow-hidden shadow-soft bg-dark">
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                  title={selectedVideo.title}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
              <div>
                <ChBadge channel={selectedVideo.channel} />
                <h3 className="font-display font-bold text-text text-lg mt-2">{selectedVideo.title}</h3>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-red transition-colors"
              >
                Watch this video on YouTube ↗
              </a>
            </div>
          </div>
        )}

        {/* Latest YouTube videos */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-text text-lg mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Latest from YouTube
          </h2>
          {loading ? (
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="aspect-video rounded-lg bg-bg mb-3" />
                  <div className="h-4 bg-bg rounded w-3/4 mb-2" />
                  <div className="h-3 bg-bg rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="card text-center py-8 text-muted">
              <p className="mb-2">Couldn’t load YouTube videos.</p>
              <p className="text-sm text-faint">{error}</p>
            </div>
          ) : ytVideos.length === 0 ? (
            <div className="card text-center py-8 text-muted">No videos found.</div>
          ) : (
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {ytVideos.map((v) => (
                <article key={v.videoId} className="card-hover group">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-dark">
                    <img
                      src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
                      alt={v.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedVideo({ videoId: v.videoId, title: v.title, channel: v.channel })}
                      aria-label={`Play ${v.title} on TechVerse`}
                      className="absolute inset-0 bg-dark/30 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-red/90 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </button>
                    {v.publishedDate && (
                      <span className="absolute bottom-2 left-2 bg-dark/80 text-white text-xs px-2 py-0.5 rounded">
                        {new Date(v.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <ChBadge channel={v.channel} />
                  </div>
                  <h3 className="text-sm font-semibold text-text mb-1 line-clamp-2 group-hover:text-green transition-colors">{v.title}</h3>
                  <div className="flex items-center justify-between gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedVideo({ videoId: v.videoId, title: v.title, channel: v.channel })}
                      className="text-sm font-semibold text-green hover:underline"
                    >
                      Play on TechVerse
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${v.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-red transition-colors"
                    >
                      Watch on YouTube ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <section aria-labelledby="youtube-playlists-heading">
          <h2 id="youtube-playlists-heading" className="font-display font-bold text-text text-lg mb-4">
            YouTube Playlists
          </h2>
          {playlistsLoading ? (
            <div className="card text-center py-8 text-muted">Loading playlists…</div>
          ) : playlistsError ? (
            <div className="card text-center py-8 text-muted">
              <p className="mb-2">Couldn’t load YouTube playlists.</p>
              <p className="text-sm text-faint">{playlistsError}</p>
            </div>
          ) : playlists.length === 0 ? (
            <div className="card text-center py-8 text-muted">No public playlists found for these channels.</div>
          ) : (
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {playlists.map((playlist) => (
                <article key={playlist.playlistId} className="card-hover">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-dark">
                    {playlist.thumbnailUrl && (
                      <img
                        src={playlist.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <ChBadge channel={playlist.channel} />
                    <span className="text-xs text-muted">{playlist.videoCount} videos</span>
                  </div>
                  <h3 className="text-sm font-semibold text-text mb-2 line-clamp-2">{playlist.title}</h3>
                  {playlist.description && (
                    <p className="text-xs text-muted mb-3 line-clamp-2">{playlist.description}</p>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => void handlePlaylistSelect(playlist)}
                      className="text-sm font-semibold text-green hover:underline"
                    >
                      Browse on TechVerse
                    </button>
                    <a
                      href={`https://www.youtube.com/playlist?list=${encodeURIComponent(playlist.playlistId)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-red transition-colors"
                    >
                      Open on YouTube ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {selectedPlaylist && (
          <section className="mt-10" aria-labelledby="selected-playlist-heading">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Selected playlist</p>
                <h2 id="selected-playlist-heading" className="font-display font-bold text-text text-lg">
                  {selectedPlaylist.title}
                </h2>
              </div>
              <a
                href={`https://www.youtube.com/playlist?list=${encodeURIComponent(selectedPlaylist.playlistId)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-red transition-colors"
              >
                Open full playlist on YouTube ↗
              </a>
            </div>
            {playlistVideosLoading ? (
              <div className="card text-center py-8 text-muted">Loading playlist videos…</div>
            ) : playlistVideosError ? (
              <div className="card text-center py-8 text-muted">{playlistVideosError}</div>
            ) : playlistVideos.length === 0 ? (
              <div className="card text-center py-8 text-muted">This playlist has no public videos.</div>
            ) : (
              <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {playlistVideos.map((video) => (
                  <article key={video.videoId} className="card-hover">
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(video)}
                      aria-label={`Play ${video.title} on TechVerse`}
                      className="block w-full text-left"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt=""
                        className="w-full aspect-video rounded-lg object-cover mb-3"
                        loading="lazy"
                      />
                      <span className="block text-sm font-semibold text-text line-clamp-2">{video.title}</span>
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm text-muted hover:text-red transition-colors"
                    >
                      Watch on YouTube ↗
                    </a>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
