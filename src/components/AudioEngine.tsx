import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { loadYouTubeApi } from "../lib/youtube";
import type { Track } from "../data/catalog";

export type AudioHandle = {
  unlock: () => void;
  toggle: (on: boolean) => void;
};

type Props = {
  track: Track;
  playing: boolean;
  onProgress: (p: number) => void;
  onBlocked: (blocked: boolean) => void;
};

const AudioEngine = forwardRef<AudioHandle, Props>(function AudioEngine(
  { track, playing, onProgress, onBlocked },
  ref
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const fadeRef = useRef<number | null>(null);
  const videoRef = useRef(track.youtubeId);
  const trackRef = useRef(track);
  const playingRef = useRef(playing);
  trackRef.current = track;
  playingRef.current = playing;

  useImperativeHandle(ref, () => ({
    unlock: () => {
      const p = playerRef.current;
      if (!p) return;
      try {
        const start = trackRef.current.chorusStart;
        if (p.getPlayerState() === 0 || p.getCurrentTime() < start) {
          p.seekTo(start, true);
        }
        p.unMute();
        p.setVolume(80);
        p.playVideo();
      } catch {
        onBlocked(true);
      }
    },
    toggle: (on) => {
      const p = playerRef.current;
      if (!p) return;
      if (on) {
        try {
          const start = trackRef.current.chorusStart;
          if (p.getPlayerState() === 0 || p.getCurrentTime() < start) {
            p.seekTo(start, true);
          }
          p.unMute();
          p.playVideo();
        } catch {
          onBlocked(true);
        }
      } else p.pauseVideo();
    },
  }), [onBlocked]);

  useEffect(() => {
    let disposed = false;
    let poll: number | undefined;

    const mount = async () => {
      try {
        const YT = await loadYouTubeApi();
        if (disposed || !hostRef.current || playerRef.current) return;
        playerRef.current = new YT.Player(hostRef.current, {
          videoId: track.youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            loop: 1,
            playlist: track.youtubeId,
            start: track.chorusStart,
            origin: window.location.origin,
            iv_load_policy: 3,
          },
          events: {
            onReady: (e) => {
              e.target.mute();
              e.target.setVolume(80);
              e.target.seekTo(trackRef.current.chorusStart, true);
            },
            onStateChange: (e) => {
              if (e.data === 1) onBlocked(false);
              if (e.data === 0 && playingRef.current) {
                e.target.seekTo(trackRef.current.chorusStart, true);
                e.target.playVideo();
              }
            },
            onError: () => onBlocked(true),
          },
        });
      } catch {
        onBlocked(true);
      }
    };

    mount();
    poll = window.setInterval(() => {
      const p = playerRef.current;
      if (!p?.getDuration) return;
      const d = p.getDuration();
      const c = p.getCurrentTime();
      if (d > 0) {
        const start = Math.min(trackRef.current.chorusStart, Math.max(0, d - 1));
        const span = Math.max(1, d - start);
        const elapsed = Math.max(0, c - start);
        onProgress(Math.min(1, elapsed / span));
      }
    }, 250);

    return () => {
      disposed = true;
      if (poll) window.clearInterval(poll);
      if (fadeRef.current) window.clearInterval(fadeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.playVideo();
    else p.pauseVideo();
  }, [playing]);

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    if (videoRef.current === track.youtubeId) return;
    videoRef.current = track.youtubeId;

    const fadeThenLoad = () => {
      let v = p.getVolume?.() ?? 80;
      if (fadeRef.current) window.clearInterval(fadeRef.current);
      fadeRef.current = window.setInterval(() => {
        v = Math.max(0, v - 14);
        try {
          p.setVolume(v);
        } catch {
          /* noop */
        }
        if (v <= 0) {
          if (fadeRef.current) window.clearInterval(fadeRef.current);
          try {
            p.loadVideoById({ videoId: track.youtubeId, startSeconds: track.chorusStart });
            p.setVolume(80);
            if (playingRef.current) {
              p.unMute();
              p.playVideo();
            }
          } catch {
            onBlocked(true);
          }
        }
      }, 32);
    };

    fadeThenLoad();
  }, [track.youtubeId, track.chorusStart, onBlocked]);

  return (
    <div className="yt-layer" aria-hidden>
      <div ref={hostRef} />
    </div>
  );
});

export default AudioEngine;
