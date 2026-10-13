import { LocalizedText } from "../i18n/LanguageContext";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Scene3D } from "./fx/Scene3D";
import { Tilt } from "./fx/Tilt";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    hidden: { opacity: 0, transform: "translateY(18px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section data-nav-theme="dark" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0A0A0A] pt-32 pb-20 text-white lg:pt-36 lg:pb-24">
      {/* 3D backdrop: canvas point sphere, dot grid, glow, isometric floor */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="dot-grid-dark absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_38%,black,transparent)]" />
        <Scene3D className="absolute -right-40 top-1/2 h-[880px] w-[880px] -translate-y-1/2 opacity-70 lg:-right-24" density={560} />
        <div className="glow-orange absolute -top-32 right-[8%] h-[480px] w-[480px] rounded-full" />
        <div className="absolute inset-x-0 bottom-0 h-[300px] overflow-hidden">
          <div className="floor-3d absolute -inset-x-24 top-6 bottom-[-120px]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-transparent to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">

          {/* Left Column (60% on desktop: 7 cols) */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Top Monospace Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 font-mono text-xs uppercase tracking-widest text-zinc-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" /><LocalizedText>
                KARSA / INDEPENDENT PILOT / 2026
              </LocalizedText></span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-5xl sm:text-7xl lg:text-[88px] xl:text-[98px] leading-[0.95] tracking-tight-editorial text-white"
            ><LocalizedText>
              Every act of learning
              </LocalizedText><br />
              <span className="italic font-normal text-[#CF6A12]"><LocalizedText>deserves a record.</LocalizedText></span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-6 sm:mt-8 text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-[540px] font-normal"
            ><LocalizedText>
              Karsa is an independent classroom-participation pilot designed for the UNTIDAR environment. It gives students, PJ, and administrators one accountable record instead of scattered paper notes.
            </LocalizedText></motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="https://www.sikarsa.id/login"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#CF6A12] px-6 py-3.5 text-sm font-medium text-white shadow-[0_16px_36px_-12px_rgba(207,106,18,0.65)] transition-all duration-200 hover:bg-[#B85B0D] hover:scale-[1.01] active:scale-[0.99]"
              >
                <span><LocalizedText>Sign in with Google</LocalizedText></span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#problem"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3.5 text-sm font-medium text-zinc-200 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white active:scale-[0.99]"
              >
                <span><LocalizedText>Read the story</LocalizedText></span>
                <span className="text-zinc-500">↓</span>
              </a>
            </motion.div>

            {/* Sub-note */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-start gap-2 text-xs font-mono text-zinc-500"
            >
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span><LocalizedText>Strictly restricted to @students.untidar.ac.id and @untidar.ac.id</LocalizedText></span>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D stage with layered fragments at different depths */}
          <div className="relative flex items-center justify-center lg:col-span-5 perspective-1200">
            {/* Giant "K" watermark */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden" aria-hidden="true">
              <span className="font-serif text-[280px] sm:text-[360px] lg:text-[420px] font-normal leading-none text-white/[0.04] translate-y-4"><LocalizedText>
                K
              </LocalizedText></span>
            </div>

            {/* Orbit ring decoration */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#CF6A12]/25 animate-spin-slower" aria-hidden="true" />

            <Tilt max={7} className="relative w-full max-w-[390px]">
              <div className="preserve-3d relative space-y-4">

                {/* Fragment 1: Point Award Card (front layer) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{ z: reduceMotion ? 0 : 64 }}
                  className="depth-dark relative rounded-2xl border border-white/40 bg-white p-4 text-zinc-900"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FBF4EE] text-[#CF6A12] font-mono text-xs font-semibold">
                        +2
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-900"><LocalizedText>
                          Pertanyaan Kritis
                        </LocalizedText></div>
                        <div className="font-mono text-[11px] text-zinc-500"><LocalizedText>
                          Pemrograman Web II • Kelas 02
                        </LocalizedText></div>
                      </div>
                    </div>
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] text-emerald-700 border border-emerald-200/60"><LocalizedText>
                      Verified
                    </LocalizedText></span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2 text-[11px] font-mono text-zinc-400">
                    <span><LocalizedText>PJ: Dimas Setiawan</LocalizedText></span>
                    <span><LocalizedText>10:42:15 WIB</LocalizedText></span>
                  </div>
                </motion.div>

                {/* Fragment 2: Class Leaderboard Row (mid layer) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ z: reduceMotion ? 0 : 34, rotate: -1 }}
                  className="depth-dark relative rounded-2xl border border-white/40 bg-white p-4 text-zinc-900"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 font-mono text-xs font-medium text-white">
                        #3
                      </div>
                      <div>
                        <div className="text-xs font-medium text-zinc-900 flex items-center gap-1.5">
                          <span><LocalizedText>A*** Pratama</LocalizedText></span>
                          <span className="rounded bg-zinc-100 px-1 font-mono text-[10px] text-zinc-500"><LocalizedText>Masked</LocalizedText></span>
                        </div>
                        <div className="font-mono text-[11px] text-zinc-500"><LocalizedText>
                          Top 5% in Class 02
                        </LocalizedText></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm font-semibold text-[#CF6A12]"><LocalizedText>
                        24 pts
                      </LocalizedText></div>
                      <div className="text-[10px] text-zinc-400 font-mono"><LocalizedText>
                        8 interactions
                      </LocalizedText></div>
                    </div>
                  </div>

                  {/* Micro Progress Track */}
                  <div className="mt-3 w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#CF6A12] h-full rounded-full w-[82%]" />
                  </div>
                </motion.div>

                {/* Fragment 3: System Validation Tag (back layer) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ z: reduceMotion ? 0 : 78 }}
                  className="depth-dark relative translate-x-2 rounded-2xl border border-white/10 bg-zinc-900 text-white p-3.5"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-zinc-200"><LocalizedText>Server Guard Validated</LocalizedText></span>
                    </div>
                    <span className="text-zinc-400 text-[10px]"><LocalizedText>SERVER AUTHZ</LocalizedText></span>
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-zinc-400 flex items-center justify-between border-t border-zinc-800 pt-2">
                    <span><LocalizedText>Authorization: current role</LocalizedText></span>
                    <span className="text-emerald-400 font-medium"><LocalizedText>Fail-closed</LocalizedText></span>
                  </div>
                </motion.div>

                {/* Fragment 4: Small Monospace Pill */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500 pt-4"
                >
                  <Sparkles className="h-3 w-3 shrink-0 text-[#CF6A12]" />
                  <span><LocalizedText>Scoped access • Auditable changes</LocalizedText></span>
                </motion.div>

              </div>
            </Tilt>
          </div>

        </div>
      </div>
    </section>
  );
}
