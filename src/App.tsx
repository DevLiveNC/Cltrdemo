import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import { scenes } from "./data/catalog";
import AudioEngine, { type AudioHandle } from "./components/AudioEngine";
import Chrome from "./components/Chrome";
import EnterGate from "./components/EnterGate";
import TrackCard from "./components/TrackCard";
import { SceneContent } from "./scenes/Scenes";

gsap.registerPlugin(Observer, ScrollTrigger);

export default function App() {
  const [entered, setEntered] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 900px), (pointer: coarse)").matches
      : false
  );
  const busy = useRef(false);
  const indexRef = useRef(0);
  const layerRefs = useRef<(HTMLElement | null)[]>([]);
  const wipeRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioHandle>(null);

  useEffect(() => {
    scenes.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px), (pointer: coarse)");
    const update = () => setIsMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const go = useCallback((next: number, dir?: 1 | -1) => {
    const from = indexRef.current;
    const total = scenes.length;
    const clamped = ((next % total) + total) % total;

    if (isMobile) {
      layerRefs.current[clamped]?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      return;
    }

    if (clamped === from || busy.current) return;
    const direction = dir ?? (clamped > from ? 1 : -1);
    const currentEl = layerRefs.current[from];
    const nextEl = layerRefs.current[clamped];
    const wipe = wipeRef.current;
    if (!currentEl || !nextEl) {
      indexRef.current = clamped;
      setIndex(clamped);
      return;
    }

    busy.current = true;
    const clipFrom = direction > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
    gsap.set(nextEl, {
      autoAlpha: 1,
      zIndex: 3,
      clipPath: clipFrom,
      scale: 1.08,
      filter: "blur(0px)",
    });
    gsap.set(currentEl, { zIndex: 2 });

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        gsap.set(currentEl, {
          autoAlpha: 0,
          clipPath: "none",
          scale: 1,
          filter: "none",
        });
        gsap.set(nextEl, { zIndex: 2, clipPath: "none", scale: 1 });
        busy.current = false;
      },
    });

    if (wipe) {
      tl.fromTo(
        wipe,
        { scaleY: 0, transformOrigin: direction > 0 ? "top" : "bottom" },
        { scaleY: 1, duration: 0.36, ease: "power3.in" },
        0
      ).to(
        wipe,
        {
          scaleY: 0,
          transformOrigin: direction > 0 ? "bottom" : "top",
          duration: 0.4,
          ease: "power3.out",
        },
        0.36
      );
    }

    tl.to(nextEl, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.08 }, 0.06).to(
      currentEl,
      { scale: 0.92, filter: "blur(10px)", opacity: 0.28, duration: 1.08 },
      0.06
    );

    const nextImg = nextEl.querySelector("img");
    if (nextImg) {
      gsap.fromTo(
        nextImg,
        { scale: 1.18, y: direction * 30 },
        { scale: 1.06, y: 0, duration: 1.6, ease: "power3.out" }
      );
    }

    indexRef.current = clamped;
    setIndex(clamped);
  }, [isMobile]);

  useEffect(() => {
    if (!entered || isMobile) return;

    const observer = Observer.create({
      type: "wheel,touch",
      wheelSpeed: -1,
      tolerance: 14,
      preventDefault: true,
      ignore: "a, button, input, textarea",
      onDown: () => go(indexRef.current - 1, -1),
      onUp: () => go(indexRef.current + 1, 1),
    });

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        go(indexRef.current + 1, 1);
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(indexRef.current - 1, -1);
      }
    };
    window.addEventListener("keydown", onKey);

    const st = ScrollTrigger.create({
      trigger: ".stage",
      start: "top top",
      end: "bottom bottom",
      onRefresh: () => ScrollTrigger.update(),
    });

    return () => {
      observer.kill();
      st.kill();
      window.removeEventListener("keydown", onKey);
    };
  }, [entered, go, isMobile]);

  useEffect(() => {
    if (!entered || !isMobile) return;

    const visible = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target, entry.intersectionRatio));
        const active = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        if (!active || active[1] < 0.2) return;
        const next = Number((active[0] as HTMLElement).dataset.index);
        if (Number.isNaN(next) || next === indexRef.current) return;
        indexRef.current = next;
        setIndex(next);
      },
      { threshold: [0.2, 0.35, 0.5, 0.65], rootMargin: "-72px 0px -22% 0px" }
    );

    layerRefs.current.forEach((scene) => scene && observer.observe(scene));
    return () => observer.disconnect();
  }, [entered, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const move = (e: PointerEvent) => {
      const el = cursorRef.current;
      if (!el) return;
      gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.16, ease: "power3.out" });
      const target = e.target as HTMLElement | null;
      setHover(Boolean(target?.closest("[data-cursor='hover']")));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [isMobile]);

  const track = scenes[index].track;

  return (
    <>
      <div ref={cursorRef} className={`cursor ${hover ? "hover" : ""}`} />
      <div className="noise" />
      <div className="vignette" />
      <div className="wipe" ref={wipeRef} />

      <AudioEngine
        ref={audioRef}
        track={track}
        playing={playing && entered}
        onProgress={setProgress}
        onBlocked={setBlocked}
      />

      <main className={`stage ${isMobile ? "stage-mobile" : ""}`}>
        {scenes.map((scene, i) => (
          <section
            key={scene.id}
            id={`scene-${scene.id}`}
            data-index={i}
            aria-label={`${scene.index} — ${scene.nav}`}
            className={`scene ${isMobile ? "scene-mobile" : ""}`}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            style={
              isMobile
                ? undefined
                : {
                    opacity: i === 0 ? 1 : 0,
                    visibility: i === 0 ? "visible" : "hidden",
                    zIndex: i === 0 ? 2 : 1,
                  }
            }
          >
            <div className="scene-media">
              <img src={scene.image} alt="" />
            </div>
            <div className="scene-shade" />
            {isMobile || i === index ? <SceneContent index={i} /> : null}
          </section>
        ))}
      </main>

      {entered ? (
        <>
          <Chrome
            index={index}
            playing={playing}
            onJump={(i) => go(i)}
            onToggle={() => {
              setPlaying((v) => {
                audioRef.current?.toggle(!v);
                return !v;
              });
            }}
          />
          <TrackCard
            track={track}
            playing={playing}
            progress={progress}
            onToggle={() => {
              setPlaying((v) => {
                audioRef.current?.toggle(!v);
                return !v;
              });
            }}
          />
          {blocked ? (
            <a
              className="yt-fallback"
              href={`https://www.youtube.com/watch?v=${track.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
            >
              Klibi YouTube’da aç
            </a>
          ) : null}
        </>
      ) : null}

      <AnimatePresence>
        {!entered ? (
          <EnterGate
            onEnter={() => {
              setEntered(true);
              setPlaying(true);
              audioRef.current?.unlock();
            }}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
