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
  const playingRef = useRef(playing);
  playingRef.current = playing;

  const runOneSecondFadeIn = (targetVolume = 80) => {
    const p = playerRef.current;
    if (!p) return;

    if (fadeRef.current) window.clearInterval(fadeRef.current);

    p.setVolume(0);
    const startMs = Date.now();
    const durationMs = 1000; // Exact 1 second fade-in

    fadeRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startMs;
      const progress = Math.min(1, elapsed / durationMs);
      const currentVol = Math.round(progress * targetVolume);

      try {
        p.setVolume(currentVol);
      } catch {
        /* noop */
      }

      if (progress >= 1) {
        if (fadeRef.current) window.clearInterval(fadeRef.current);
      }
    }, 30);
  };

  useImperativeHandle(ref, () => ({
    unlock: () => {
      const p = playerRef.current;
      if (!p) return;
      try {
        p.unMute();
        p.seekTo(track.startTime || 40, true);
        p.playVideo();
        runOneSecondFadeIn(80);
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
        runOneSecondFadeIn(80);
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
            start: track.startTime || 40,
          },
          events: {
            onReady: (e) => {
              e.target.mute();
              e.target.setVolume(0);
              try {
                e.target.seekTo(track.startTime || 40, true);
              } catch {
                /* noop */
              }
            },
            onStateChange: (e) => {
              if (e.data === 1) onBlocked(false);
              if (e.data === 0 && playingRef.current) {
                e.target.seekTo(track.startTime || 40, true);
                e.target.playVideo();
                runOneSecondFadeIn(80);
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
      if (d > 0) onProgress(c / d);
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

  // Handle Track Changes instantly: seek to middle/chorus & 1s Fade-In
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    if (videoRef.current === track.youtubeId) return;
    videoRef.current = track.youtubeId;

    try {
      if (fadeRef.current) window.clearInterval(fadeRef.current);
      p.setVolume(0);
      p.loadVideoById({
        videoId: track.youtubeId,
        startSeconds: track.startTime || 40,
      });

      if (playingRef.current) {
        p.unMute();
        p.playVideo();
        runOneSecondFadeIn(80);
      }
    } catch {
      onBlocked(true);
    }
  }, [track.youtubeId, track.startTime, onBlocked]);

  return (
    <div className="yt-layer" aria-hidden>
      <div ref={hostRef} />
    </div>
  );
});

export default AudioEngine;
