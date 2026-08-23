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

// Full volume: when the sound is on it should come in loud, not modest.
const TARGET_VOLUME = 100;

const AudioEngine = forwardRef<AudioHandle, Props>(function AudioEngine(
  { track, playing, onProgress, onBlocked },
  ref
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const playerReadyRef = useRef(false);
  const fadeRef = useRef<number | null>(null);
  const videoRef = useRef(track.youtubeId);
  const playingRef = useRef(playing);
  playingRef.current = playing;
  // Becomes true the moment the user enters the stage (a real gesture).
  // Lets us re-apply unmuted playback if the player wasn't ready yet at entry.
  const unlockedRef = useRef(false);
  // Keep the latest track in a ref so imperative handlers never go stale.
  const trackRef = useRef(track);
  trackRef.current = track;

  const runOneSecondFadeIn = (targetVolume = TARGET_VOLUME) => {
    const p = playerRef.current;
    if (!p) return;

    if (fadeRef.current) window.clearInterval(fadeRef.current);

    try {
      p.unMute();
      p.setVolume(0);
    } catch {
      /* noop */
    }
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
        fadeRef.current = null;
        // Guarantee the player ends up unmuted at full volume,
        // even if some setVolume calls were dropped mid-fade.
        try {
          p.unMute();
          p.setVolume(targetVolume);
        } catch {
          /* noop */
        }
      }
    }, 30);
  };

  // Play the current track out loud: unmute + (optional) seek + play + fade to full.
  const playOutLoud = (seek: boolean) => {
    const p = playerRef.current;
    if (!p || !playerReadyRef.current) return;
    try {
      p.unMute();
      if (seek) p.seekTo(trackRef.current.startTime || 40, true);
      p.playVideo();
      runOneSecondFadeIn(TARGET_VOLUME);
    } catch {
      onBlocked(true);
    }
  };

  useImperativeHandle(ref, () => ({
    unlock: () => {
      unlockedRef.current = true;
      playOutLoud(true);
    },
    toggle: (on) => {
      if (on) {
        unlockedRef.current = true;
        playOutLoud(false);
      } else {
        const p = playerRef.current;
        if (!p) return;
        if (fadeRef.current) {
          window.clearInterval(fadeRef.current);
          fadeRef.current = null;
        }
        p.pauseVideo();
      }
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
              playerReadyRef.current = true;
              // If the user already entered (audio unlocked) or playback was
              // requested before the player finished loading, start LOUD now
              // instead of staying politely muted at volume 0.
              if (unlockedRef.current || playingRef.current) {
                playOutLoud(true);
                return;
              }
              e.target.mute();
              e.target.setVolume(0);
              try {
                e.target.seekTo(track.startTime || 40, true);
              } catch {
                /* noop */
              }
            },
            onStateChange: (e) => {
              if (e.data === 1) {
                onBlocked(false);
                // Self-heal: if playback is running but the player is still
                // muted (e.g. an early command got dropped), restore full sound.
                if (
                  unlockedRef.current &&
                  playingRef.current &&
                  !fadeRef.current
                ) {
                  try {
                    if (e.target.isMuted?.()) {
                      e.target.unMute();
                      e.target.setVolume(TARGET_VOLUME);
                    }
                  } catch {
                    /* noop */
                  }
                }
              }
              if (e.data === 0 && playingRef.current) {
                e.target.seekTo(trackRef.current.startTime || 40, true);
                e.target.playVideo();
                runOneSecondFadeIn(TARGET_VOLUME);
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
    if (playing) {
      // Always restore full sound when playback is (re)requested — this also
      // covers entering the stage before the player was ready.
      unlockedRef.current = true;
      playOutLoud(false);
    } else {
      if (fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
      p.pauseVideo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  // Handle Track Changes instantly: seek to middle/chorus & 1s Fade-In
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    if (videoRef.current === track.youtubeId) return;
    videoRef.current = track.youtubeId;

    try {
      if (fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
      p.setVolume(0);
      p.loadVideoById({
        videoId: track.youtubeId,
        startSeconds: track.startTime || 40,
      });

      if (playingRef.current) {
        p.unMute();
        p.playVideo();
        runOneSecondFadeIn(TARGET_VOLUME);
      }
    } catch {
      onBlocked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.youtubeId, track.startTime, onBlocked]);

  return (
    <div className="yt-layer" aria-hidden>
      <div ref={hostRef} />
    </div>
  );
});

export default AudioEngine;
