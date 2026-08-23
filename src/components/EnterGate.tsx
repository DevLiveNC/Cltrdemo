import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type EnterGateProps = {
  onEnter: () => void;
};

export default function EnterGate({ onEnter }: EnterGateProps) {
  const [phase, setPhase] = useState<"drawing" | "revealed">("drawing");

  useEffect(() => {
    // Vector drawing animation finishes in ~2.0 seconds (Max total time < 3.3s)
    const timer = setTimeout(() => {
      setPhase("revealed");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // First page: no scroll / swipe / keyboard entry — only the button.
  useEffect(() => {
    const blockScroll = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
    };
  }, []);

  return (
    <motion.div
      className="gate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src="/images/scenes/bg-home.jpg" alt="" />
      <div className="gate-shade" />
      <div className="gate-copy">
        <p className="kicker">İstanbul · Records & Production</p>

        {/* Vectoral Drawing SVG for CLTR */}
        <div className="gate-logo-svg">
          <svg viewBox="0 0 580 150" className="cltr-vector-svg" aria-label="CLTR">
            <g transform="translate(32, 12) skewX(-14)">
              {/* Letter C */}
              <motion.path
                d="M 120 28 L 62 28 C 38 28 24 44 24 68 C 24 92 38 108 62 108 L 120 108"
                fill="none"
                stroke="#ffffff"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {/* Letter L */}
              <motion.path
                d="M 160 28 L 160 108 L 225 108"
                fill="none"
                stroke="#ffffff"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.12 }}
              />
              {/* Letter T */}
              <motion.path
                d="M 260 28 L 360 28 M 310 28 L 310 108"
                fill="none"
                stroke="#ffffff"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.24 }}
              />
              {/* Letter R */}
              <motion.path
                d="M 395 108 L 395 28 L 450 28 C 478 28 486 44 485 58 C 484 72 472 82 450 82 L 395 82 M 438 82 L 485 108"
                fill="none"
                stroke="#ffffff"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.36 }}
              />
            </g>
          </svg>
        </div>

        {/* Text transition area */}
        <div className="gate-text-container">
          <AnimatePresence mode="wait">
            {phase === "drawing" ? (
              <motion.p
                key="credits"
                className="lede gate-credit-text"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
              >
                tasarım ve kodlama{" "}
                <span className="pistachio-text">live</span>Development tarafından yapılmıştır.
              </motion.p>
            ) : (
              <motion.p
                key="main-lede"
                className="lede"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ marginInline: "auto" }}
              >
                CULTURE. Eray, Mansur ve evin sesi.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Sahneye gir — click only */}
        <div className="gate-btn-container">
          {phase === "revealed" && (
            <motion.button
              type="button"
              className="enter-text-group"
              onClick={onEnter}
              data-cursor="hover"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <span className="enter-prominent-text">SAHNEYE GİR</span>
              <span className="enter-scroll-hint">
                <i className="scroll-dot" /> tıkla
              </span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
