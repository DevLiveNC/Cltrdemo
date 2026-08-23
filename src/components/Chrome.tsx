import { scenes } from "../data/catalog";

export default function Chrome({
  index,
  playing,
  onJump,
  onToggle,
}: {
  index: number;
  playing: boolean;
  onJump: (i: number) => void;
  onToggle: () => void;
}) {
  return (
    <div className="chrome">
      <header className="topbar">
        <button className="logo" onClick={() => onJump(0)} data-cursor="hover">
          CLTR
          <small>CULTURE</small>
        </button>
        <nav className="nav">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              className={i === index ? "on" : ""}
              onClick={() => onJump(i)}
              data-cursor="hover"
            >
              {s.nav}
            </button>
          ))}
        </nav>
        <button className="icon-btn" onClick={onToggle} data-cursor="hover">
          {playing ? "SES" : "MUTE"}
        </button>
      </header>

      <div className="scene-count">
        {scenes[index].index} / 08
      </div>

      <div className="progress">
        {scenes.map((s, i) => (
          <button
            key={s.id}
            className={i === index ? "on" : ""}
            onClick={() => onJump(i)}
            aria-label={s.nav}
            data-cursor="hover"
          />
        ))}
      </div>

      <div className="hint">
        <i />
        kaydır
      </div>
    </div>
  );
}
