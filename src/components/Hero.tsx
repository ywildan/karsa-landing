import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  // Parallax on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const card1X = useTransform(smoothX, [-300, 300], [-8, 8]);
  const card1Y = useTransform(smoothY, [-300, 300], [-6, 6]);

  const card2X = useTransform(smoothX, [-300, 300], [6, -6]);
  const card2Y = useTransform(smoothY, [-300, 300], [8, -8]);

  const card3X = useTransform(smoothX, [-300, 300], [-4, 4]);
  const card3Y = useTransform(smoothY, [-300, 300], [5, -5]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-zinc-200/60 bg-[#FAFAFA]">
      {/* Editorial Grid Guides (very subtle) */}
      <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full w-full grid grid-cols-12 gap-8 border-x border-zinc-200/40 opacity-40">
          <div className="hidden lg:block col-span-7 border-r border-zinc-200/40" />
          <div className="hidden lg:block col-span-5" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (60% on desktop: 7 cols) */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Top Monospace Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 font-mono text-xs uppercase tracking-widest text-zinc-600 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" />
                KARSA / EST. 2026 / UNTIDAR
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-5xl sm:text-7xl lg:text-[88px] xl:text-[98px] leading-[0.95] tracking-tight-editorial text-zinc-950"
            >
              Every act of learning
              <br />
              <span className="italic font-normal text-zinc-800">deserves a record.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-6 sm:mt-8 text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-[540px] font-normal"
            >
              Karsa is the activity tracking system for Universitas Tidar. It replaces paper logs and spreadsheets with a single source of truth — for students, instructors, and administrators.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="https://karsa-one.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-lg bg-[#CF6A12] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#B85B0D] hover:shadow hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Sign in with Google</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#problem"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-3.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 active:scale-[0.99]"
              >
                <span>Read the story</span>
                <span className="text-zinc-400">↓</span>
              </a>
            </motion.div>

            {/* Sub-note */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center gap-2 text-xs font-mono text-zinc-500"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Strictly restricted to @students.untidar.ac.id and @untidar.ac.id</span>
            </motion.div>
          </motion.div>

          {/* Right Column (40% on desktop: 5 cols) - Typographic Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] lg:min-h-[500px]">
            {/* Giant "K" watermark */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
              <span className="font-serif text-[280px] sm:text-[360px] lg:text-[420px] font-normal leading-none text-zinc-900/[0.04] translate-y-4">
                K
              </span>
            </div>

            {/* Floating UI Fragments */}
            <div className="relative w-full max-w-[390px] space-y-4">
              
              {/* Fragment 1: Point Award Card */}
              <motion.div
                style={{ x: card1X, y: card1Y }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#CF6A12] font-mono text-xs font-semibold">
                      +2
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-900">
                        Pertanyaan Kritis
                      </div>
                      <div className="font-mono text-[11px] text-zinc-500">
                        Pemrograman Web II • Kelas 02
                      </div>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] text-emerald-700 border border-emerald-200/60">
                    Verified
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2 text-[11px] font-mono text-zinc-400">
                  <span>PJ: Dimas Setiawan</span>
                  <span>10:42:15 WIB</span>
                </div>
              </motion.div>

              {/* Fragment 2: Class Leaderboard Row */}
              <motion.div
                style={{ x: card2X, y: card2Y }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative -rotate-1 rounded-xl border border-zinc-200/80 bg-white p-4 shadow-md hover:rotate-0 transition-transform duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 font-mono text-xs font-medium text-white">
                      #3
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-900 flex items-center gap-1.5">
                        <span>A*** Pratama</span>
                        <span className="rounded bg-zinc-100 px-1 font-mono text-[10px] text-zinc-500">Masked</span>
                      </div>
                      <div className="font-mono text-[11px] text-zinc-500">
                        Top 5% in Class 02
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-semibold text-[#CF6A12]">
                      24 pts
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono">
                      8 interactions
                    </div>
                  </div>
                </div>

                {/* Micro Progress Track */}
                <div className="mt-3 w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#CF6A12] h-full rounded-full w-[82%]" />
                </div>
              </motion.div>

              {/* Fragment 3: System Validation Tag */}
              <motion.div
                style={{ x: card3X, y: card3Y }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative translate-x-2 rounded-xl border border-zinc-200/70 bg-zinc-900 text-white p-3.5 shadow-sm"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-zinc-200">Server Guard Validated</span>
                  </div>
                  <span className="text-zinc-400 text-[10px]">UNTIDAR SSO</span>
                </div>
                <div className="mt-2 text-[11px] font-mono text-zinc-400 flex items-center justify-between border-t border-zinc-800 pt-2">
                  <span>Session Hash: 4e9a...81f</span>
                  <span className="text-emerald-400 font-medium">0.04s latency</span>
                </div>
              </motion.div>

              {/* Fragment 4: Small Monospace Pill */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-400 pt-1"
              >
                <Sparkles className="h-3 w-3 text-[#CF6A12]" />
                <span>Zero paper logs • Zero post-exam guesswork</span>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
