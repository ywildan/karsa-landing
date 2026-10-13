import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { isFastScrolling } from "./fastScroll";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Scroll-triggered entrance: rises while un-tilting from 3D space.
 *  If the user is scrolling fast when it triggers, it snaps straight to
 *  the final state so fast travel never strobes. */
export function Reveal({ children, className, delay = 0, y = 30 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (inView && isFastScrolling()) setInstant(true);
  }, [inView]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, rotateX: 7 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y, rotateX: 7 }}
      transition={instant ? { duration: 0 } : { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1100 }}
    >
      {children}
    </motion.div>
  );
}
