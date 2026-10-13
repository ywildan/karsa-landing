/**
 * Detects "fast travel" scrolling (flings, rapid anchor glides).
 * Entrance animations check isFastScrolling() when they trigger: if the
 * user is flying through the page, elements snap straight to their final
 * state instead of strobing through half-finished fades.
 *
 * Two signals, because instantaneous velocity alone is unreliable at the
 * trigger moment (a fling's deceleration tail dips under any threshold
 * while the travel is still perceptually fast, and IntersectionObserver
 * callbacks can lag the scroll itself):
 *  1. instantaneous velocity above a threshold in the last 300 ms;
 *  2. large displacement (> 700 px) within the last 650 ms.
 */
let installed = false;
let lastY = 0;
let lastT = 0;
let fastUntil = 0;
const samples: { t: number; y: number }[] = [];

const VELOCITY_THRESHOLD = 1600; // px per second
const FAST_WINDOW_MS = 300;
const DISPLACEMENT_WINDOW_MS = 650;
const DISPLACEMENT_THRESHOLD = 700; // px

export function initFastScrollTracking() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  lastY = window.scrollY;
  lastT = performance.now();
  samples.push({ t: lastT, y: lastY });
  window.addEventListener(
    "scroll",
    () => {
      const now = performance.now();
      const y = window.scrollY;
      samples.push({ t: now, y });
      while (samples.length > 2 && now - samples[0].t > 1500) samples.shift();
      const dt = now - lastT;
      if (dt >= 16) {
        const velocity = (Math.abs(y - lastY) / dt) * 1000;
        if (velocity > VELOCITY_THRESHOLD) fastUntil = now + FAST_WINDOW_MS;
        lastY = y;
        lastT = now;
      }
    },
    { passive: true },
  );
}

export function isFastScrolling() {
  if (performance.now() < fastUntil) return true;
  const now = performance.now();
  const currentY = window.scrollY;
  // Oldest sample still inside the displacement window.
  for (const s of samples) {
    if (now - s.t <= DISPLACEMENT_WINDOW_MS) {
      return Math.abs(currentY - s.y) > DISPLACEMENT_THRESHOLD;
    }
  }
  return false;
}
