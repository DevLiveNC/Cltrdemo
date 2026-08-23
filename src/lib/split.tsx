import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function KineticLine({
  text,
  className,
  delay = 0,
  stagger = 0.034,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="word">
          {word.split("").map((ch, i) => (
            <span key={`${wi}-${i}`} className="char-mask">
              <motion.span
                className="char"
                initial={{ y: "120%", rotateX: -70, opacity: 0 }}
                animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                exit={{ y: "-80%", opacity: 0 }}
                transition={{
                  duration: 0.82,
                  delay: delay + (wi * 3 + i) * stagger,
                  ease,
                }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
          {wi < words.length - 1 ? <span className="char-space"> </span> : null}
        </span>
      ))}
    </span>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -16, opacity: 0 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
