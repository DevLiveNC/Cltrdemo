let apiPromise: Promise<YTNamespace> | null = null;

export function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="youtube.com/iframe_api"]');
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
      else reject(new Error("YT missing"));
    };
    if (!existing) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.onerror = () => reject(new Error("YT script failed"));
      document.head.appendChild(tag);
    }
    window.setTimeout(() => {
      if (window.YT?.Player) resolve(window.YT);
    }, 4000);
  });

  return apiPromise;
}

export function youtubeWatch(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function spotifySearch(q: string) {
  return `https://open.spotify.com/search/${encodeURIComponent(q)}`;
}
