import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
  /** Depth (translateZ) applied while hovering, in px. */
  lift?: number;
}

/**
 * Pointer-driven 3D tilt wrapper. The element rotates in real 3D space
 * (rotateX/rotateY with perspective) and springs back on leave.
 * Falls back to a static wrapper for reduced-motion / touch pointers.
 */
export function Tilt({ children, className, max = 9, lift = 0 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { damping: 22, stiffness: 180, mass: 0.6 });
  const sry = useSpring(ry, { damping: 22, stiffness: 180, mass: 0.6 });
  const transform = useTransform(
    [srx, sry],
    ([x, y]) => `perspective(1100px) rotateX(${x}deg) rotateY(${y}deg) translateZ(${lift}px)`
  );

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
