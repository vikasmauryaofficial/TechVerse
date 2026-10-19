
# TechVerse

## YouTube Data API

The Videos page fetches channel uploads and public playlists through the Supabase Edge Function. The Google API key is only used on the server; do not add it to a `VITE_` environment variable or commit it to the repository.

1. Enable **YouTube Data API v3** in Google Cloud and create an API key.
2. Set the key as a Supabase function secret:

   ```powershell
   supabase secrets set YOUTUBE_API_KEY=your-api-key
   ```

3. Deploy the function:

   ```powershell
   supabase functions deploy youtube-feed
   ```

The project also needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` configured for the frontend. Channel IDs can be managed in the TechVerse site settings.

## Interactive subjects

The interactive lessons are served from `public/subjects/` and embedded in TechVerse at `/subjects/:slug`. The Notes page has separate **Subjects** and **Notes** sections, and the Notes navigation menu links to the subject catalog. Each lesson remains directly accessible as a static page; the database lessons read their bundled content and run practice in the browser.
