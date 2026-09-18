import { motion } from "framer-motion";
import { AlertCircle, FileX, History, EyeOff } from "lucide-react";

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
    <section id="problem" className="relative bg-[#0A0A0A] text-white py-24 sm:py-32 overflow-hidden">
      {/* Subtle top and bottom hairline borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-zinc-800" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-zinc-800" />

      {/* Editorial grid guides */}
      <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full w-full grid grid-cols-12 gap-8 border-x border-zinc-800/40 opacity-30">
          <div className="hidden lg:block col-span-5 border-r border-zinc-800/40" />
          <div className="hidden lg:block col-span-7" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (40% - 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs font-medium tracking-widest text-[#CF6A12] uppercase">
                01 — The Problem
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] leading-[1.05] tracking-tight-editorial text-white">
              Points recorded on paper
              <br />
              <span className="italic text-zinc-400">are points lost.</span>
            </h2>

            <p className="mt-6 text-base text-zinc-400 leading-relaxed font-sans max-w-sm">
              Across 6 faculties and hundreds of classroom sections at Universitas Tidar, informal tally sheets fail both lecturers and active students.
            </p>

            {/* Micro audit callout */}
            <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-300 mb-1 font-medium">
                <AlertCircle className="h-4 w-4 text-[#CF6A12]" />
                <span>The Traditional Ledger Gap</span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-500">
                A single missed tally sheet at Week 11 affects up to 15% of a student&apos;s final participation component.
              </p>
            </div>
          </motion.div>

          {/* Right Column (60% - 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {paragraphs.map((para, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Thin vertical accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-800 group-hover:bg-[#CF6A12] transition-colors duration-300" />

                <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  <para.icon className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#CF6A12] transition-colors" />
                  <span>{para.tag}</span>
                </div>

                <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-sans max-w-[480px]">
                  {para.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
