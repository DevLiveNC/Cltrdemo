import { motion } from "framer-motion";
import { KineticLine } from "../lib/split";

export default function EnterGate({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      className="gate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src="/images/hero-night.jpg" alt="" />
      <div className="gate-shade" />
      <div className="gate-copy">
        <p className="kicker">İstanbul · Records & Production</p>
        <h1>
          <KineticLine text="CLTR" stagger={0.06} />
        </h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          CULTURE. Eray, Mansur ve evin sesi.
        </p>
        <button className="enter" onClick={onEnter} data-cursor="hover">
          Sahneye gir
        </button>
      </div>
    </motion.div>
  );
}
