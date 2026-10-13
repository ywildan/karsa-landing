import { useEffect, useRef } from "react";

interface Scene3DProps {
  className?: string;
  /** Point count for the sphere cloud (density). */
  density?: number;
}

/**
 * Real-time 3D point sphere rendered on a 2D canvas: a rotating cloud of
 * points projected with true perspective, plus two tilted orbit rings.
 * Pure canvas (no WebGL dependency), DPR-capped, pauses off-screen, and
 * renders a single static frame under prefers-reduced-motion.
 */
export function Scene3D({ className, density = 620 }: Scene3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fibonacci sphere point cloud
    const points: { x: number; y: number; z: number; orange: boolean }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < density; i++) {
      const y = 1 - (i / (density - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      points.push({
        x: Math.cos(theta) * radius,
        y,
        z: Math.sin(theta) * radius,
        orange: i % 5 === 0,
      });
    }
    // Orbit ring points (two tilted great circles)
    const rings: { pts: { x: number; y: number; z: number }[]; tiltX: number; tiltZ: number }[] = [
      { pts: [], tiltX: 1.15, tiltZ: 0.35 },
      { pts: [], tiltX: 1.35, tiltZ: -0.5 },
    ];
    for (const ring of rings) {
      for (let i = 0; i < 140; i++) {
        const a = (i / 140) * Math.PI * 2;
        ring.pts.push({ x: Math.cos(a) * 1.18, y: 0, z: Math.sin(a) * 1.18 });
      }
    }

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let visible = true;
    let rotY = 0.4;
    let rotX = -0.32;
    let targetTiltX = -0.32;
    let targetTiltY = 0;
    let mouseTiltY = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw();
    };

    const rotate = (p: { x: number; y: number; z: number }, ax: number, ay: number) => {
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      return { x: x1, y: y2, z: z2 };
    };

    const draw = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.34;
      const focal = 3.2;

      const projected = points.map((p) => {
        const r = rotate(p, rotX, rotY);
        const scale = focal / (focal - r.z);
        return { sx: cx + r.x * R * scale, sy: cy + r.y * R * scale, z: r.z, orange: p.orange, scale };
      });
      projected.sort((a, b) => a.z - b.z);
      for (const p of projected) {
        const depth = (p.z + 1) / 2; // 0 back, 1 front
        const alpha = 0.14 + depth * 0.62;
        const size = 0.7 + depth * 1.7;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = p.orange
          ? `rgba(207, 106, 18, ${alpha})`
          : `rgba(235, 235, 240, ${alpha * 0.85})`;
        ctx.fill();
      }

      // Orbit rings
      for (const ring of rings) {
        ctx.beginPath();
        ring.pts.forEach((p, i) => {
          const tilted = {
            x: p.x,
            y: p.y * Math.cos(ring.tiltX) - p.z * Math.sin(ring.tiltX),
            z: p.y * Math.sin(ring.tiltX) + p.z * Math.cos(ring.tiltX),
          };
          const spun = {
            x: tilted.x * Math.cos(ring.tiltZ) - tilted.y * Math.sin(ring.tiltZ),
            y: tilted.x * Math.sin(ring.tiltZ) + tilted.y * Math.cos(ring.tiltZ),
            z: tilted.z,
          };
          const r = rotate(spun, rotX, rotY);
          const scale = focal / (focal - r.z);
          const sx = cx + r.x * R * scale;
          const sy = cy + r.y * R * scale;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        });
        ctx.closePath();
        ctx.strokeStyle = "rgba(207, 106, 18, 0.28)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Core
      const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5);
      coreGradient.addColorStop(0, "rgba(207, 106, 18, 0.16)");
      coreGradient.addColorStop(1, "rgba(207, 106, 18, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();
    };

    const tick = () => {
      if (!running) return;
      if (visible) {
        rotY += 0.0026;
        mouseTiltY += (targetTiltY - mouseTiltY) * 0.04;
        rotX += (targetTiltX + mouseTiltY * 0.3 - rotX) * 0.04;
        draw();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMouseMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      targetTiltY = nx * 0.5;
      targetTiltX = -0.32 + ny * 0.35;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 });
    io.observe(canvas);

    if (reduceMotion) {
      draw();
    } else {
      raf = requestAnimationFrame(tick);
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
