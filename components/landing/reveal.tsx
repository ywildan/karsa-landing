"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
type RevealProps = { children: ReactNode; className?: string; delay?: number };

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();
  return <motion.div className={className} data-motion
    initial={{ opacity: 0, transform: reduced ? "none" : "translateY(24px)" }}
    whileInView={{ opacity: 1, transform: "translateY(0px)" }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: EASE }}>
    {children}
  </motion.div>;
}

export function HeroEntry({ children, className, delay = 0, scale = false, inline = false }: RevealProps & { scale?: boolean; inline?: boolean }) {
  const reduced = useReducedMotion();
  const Component = inline ? motion.span : motion.div;
  return <Component className={className} data-motion
    initial={{ opacity: 0, transform: reduced ? "none" : scale ? "scale(0.96)" : "translateY(18px)" }}
    animate={{ opacity: 1, transform: scale ? "scale(1)" : "translateY(0px)" }}
    transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: EASE }}>{children}</Component>;
}

export function Progress({ value = 72 }: { value?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className="progress-track" role="img" aria-label={`Illustrative progress: ${value} percent`}
    initial="empty" whileInView="filled" viewport={{ once: true, amount: 0.2 }}>
    <div style={{ width: `${value}%`, height: "100%" }}>
      <motion.div className="progress-fill" data-motion
        variants={{ empty: { transform: reduced ? "scaleX(1)" : "scaleX(0)" }, filled: { transform: "scaleX(1)" } }}
        transition={{ duration: reduced ? 0 : 0.7, ease: EASE }} />
    </div>
  </motion.div>;
}
