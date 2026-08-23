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
  const chorusRef = useRef(track.chorusStart);
  const playingRef = useRef(playing);
  playingRef.current = playing;

  useImperativeHandle(ref, () => ({
    unlock: () => {
      const p = playerRef.current;
      if (!p) return;
      try {
        p.unMute();
        p.setVolume(80);
        p.seekTo(chorusRef.current, true);
        p.playVideo();
      } catch {
        onBlocked(true);
      }
    },
    toggle: (on) => {
      const p = playerRef.current;
      if (!p) return;
      if (on) {
        p.unMute();
        p.playVideo();
      } else p.pauseVideo();
    },
  }));

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
            start: Math.round(track.chorusStart),
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            loop: 1,
            playlist: track.youtubeId,
            origin: window.location.origin,
            iv_load_policy: 3,
          },
          events: {
            onReady: (e) => {
              e.target.mute();
              e.target.setVolume(80);
            },
            onStateChange: (e) => {
              if (e.data === 1) onBlocked(false);
              if (e.data === 0 && playingRef.current) {
                // Şarkı bittiğinde nakarattan (chorus) yeniden başlat.
                try {
                  e.target.seekTo(chorusRef.current, true);
                } catch {
                  /* noop */
                }
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
      if (d > 0) onProgress((c - chorusRef.current) / (d - chorusRef.current));
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
    chorusRef.current = track.chorusStart;

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
