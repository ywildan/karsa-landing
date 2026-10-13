import { LocalizedText } from "../i18n/LanguageContext";
import { motion } from "framer-motion";
import { AlertCircle, FileX, History, EyeOff } from "lucide-react";
import { Tilt } from "./fx/Tilt";
import { Reveal } from "./fx/Reveal";

export function TheProblem() {
  const paragraphs = [
    {
      icon: FileX,
      text: "Instructors carry notebooks to every session. Pages tear. Ink smears. Coffee spills.",
      tag: "PHYSICAL ATTRITION",
    },
    {
      icon: History,
      text: "By exam week, the log is incomplete. Half the points were never tallied. The instructor has to reconstruct from memory.",
      tag: "INFORMATION DRIFT",
    },
    {
      icon: EyeOff,
      text: "Students have no way to see where they stand until the final grade is posted. By then, it's too late.",
      tag: "ZERO VISIBILITY",
    },
  ];

  return (
    <section data-nav-theme="dark" id="problem" className="relative bg-[#0A0A0A] text-white py-24 sm:py-32 overflow-hidden">
      {/* Subtle top and bottom hairline borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-zinc-800" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-zinc-800" />

      {/* Dot-grid stage backdrop with orange glow accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid-dark opacity-50" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full glow-orange opacity-60" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -right-32 h-80 w-80 rounded-full glow-orange opacity-40" />

      {/* Editorial grid guides */}
      <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full w-full grid grid-cols-12 gap-8 border-x border-zinc-800/40 opacity-30">
          <div className="hidden lg:block col-span-5 border-r border-zinc-800/40" />
          <div className="hidden lg:block col-span-7" />
        </div>
      </div>

      {/* 3D grid floor along the bottom edge of the stage */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-40 h-80 overflow-hidden perspective-1200 opacity-70">
        <div className="floor-3d absolute inset-x-[-10%] top-0 h-[440px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column (40% - 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-2 mb-6">
              <span aria-hidden="true" className="h-px w-8 bg-[#CF6A12]" />
              <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#CF6A12] uppercase"><LocalizedText>
                01 — The Problem
              </LocalizedText></span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] leading-[1.05] tracking-tight-editorial text-white"><LocalizedText>
              Points recorded on paper
              </LocalizedText><br />
              <span className="italic text-zinc-400"><LocalizedText>are points lost.</LocalizedText></span>
            </h2>

            <p className="mt-6 text-base text-zinc-400 leading-relaxed font-sans max-w-sm"><LocalizedText>
              In classroom workflows, informal tally sheets make participation difficult to verify, review, and carry consistently into an academic recap.
            </LocalizedText></p>

            {/* Micro audit callout */}
            <Reveal delay={0.15} className="relative mt-8 preserve-3d">
              <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-[#CF6A12]/25 bg-[#CF6A12]/5" />
              <div className="relative rounded-2xl border border-zinc-800 glass-dark depth-dark p-5 font-mono text-xs text-zinc-400">
                <div className="flex items-center gap-2 text-zinc-300 mb-1 font-medium">
                  <AlertCircle className="h-4 w-4 text-[#CF6A12]" />
                  <span><LocalizedText>The Traditional Ledger Gap</LocalizedText></span>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-500"><LocalizedText>
                  The core risk is not paper itself. It is a record that cannot be checked by the student, scoped by role, or traced when a correction is needed.
                </LocalizedText></p>
              </div>
            </Reveal>
          </motion.div>

          {/* Right Column (60% - 7 cols): layered 3D depth cards */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 perspective-1200">
            {paragraphs.map((para, index) => (
              <Tilt key={index} max={5} lift={10} className="relative preserve-3d">
                {/* Offset back panel, so each card reads as a physical stack */}
                <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/40" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl border border-zinc-800 glass-dark depth-dark p-6 sm:p-8 group overflow-hidden"
                >
                  {/* Orange glow bleeding from the card's top edge */}
                  <div aria-hidden="true" className="pointer-events-none absolute -top-16 right-8 h-32 w-48 rounded-full glow-orange opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                  {/* Thin vertical accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-800 group-hover:bg-[#CF6A12] transition-colors duration-300" />

                  <div className="relative flex items-center gap-2 mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80">
                      <para.icon className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#CF6A12] transition-colors" />
                    </span>
                    <span><LocalizedText>{para.tag}</LocalizedText></span>
                  </div>

                  <p className="relative text-lg sm:text-xl text-zinc-300 leading-relaxed font-sans max-w-[480px]">
                    <LocalizedText>{para.text}</LocalizedText>
                  </p>
                </motion.div>
              </Tilt>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
