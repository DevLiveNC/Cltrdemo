import { AnimatePresence, motion } from "framer-motion";
import type { Track } from "../data/catalog";
import { spotifySearch, youtubeWatch } from "../lib/youtube";

export default function TrackCard({
  track,
  playing,
  progress,
  onToggle,
}: {
  track: Track;
  playing: boolean;
  progress: number;
  onToggle: () => void;
}) {
  return (
    <aside className="track-card" data-cursor="hover">
      <button onClick={onToggle} aria-label={playing ? "Sesi duraklat" : "Sesi oynat"}>
        <img src={track.cover} alt={`${track.title} kapak görseli`} />
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={track.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <h4>{track.title}</h4>
          <p>{track.artists}</p>
          <small>{track.note}</small>
          <div className="track-meta">
            {track.album} · {track.releaseDate} · {track.duration}
          </div>
        </motion.div>
      </AnimatePresence>
      <div style={{ display: "grid", justifyItems: "end", gap: 8 }}>
        <div className={`eq ${playing ? "" : "off"}`} aria-hidden>
          <i style={{ height: 8 }} />
          <i style={{ height: 16 }} />
          <i style={{ height: 11 }} />
          <i style={{ height: 18 }} />
          <i style={{ height: 7 }} />
        </div>
        <div style={{ display: "flex", gap: 8, fontSize: 10, letterSpacing: "0.14em" }}>
          <a href={youtubeWatch(track.youtubeId)} target="_blank" rel="noreferrer">
            YOUTUBE
          </a>
          <a href={spotifySearch(`${track.title} ${track.artists}`)} target="_blank" rel="noreferrer">
            SPOTIFY
          </a>
        </div>
      </div>
      <div className="bar">
        <span style={{ width: `${Math.min(100, progress * 100)}%` }} />
      </div>
    </aside>
  );
}
