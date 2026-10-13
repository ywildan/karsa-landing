import { LocalizedText } from "../i18n/LanguageContext";
import { motion } from "framer-motion";
import { Reveal } from "./fx/Reveal";

export function TheNumbers() {
  const stats = [
    {
      number: "3",
      label: "scoped roles",
      sub: "Student, PJ, and admin permissions are enforced on the server",
    },
    {
      number: "15",
      label: "minute access token",
      sub: "Short-lived native access with revocable refresh sessions",
    },
    {
      number: "30",
      label: "day backup retention",
      sub: "Daily encrypted artifacts with restore tested in isolation",
    },
  ];

  return (
    <section data-nav-theme="dark" className="relative bg-[#0A0A0A] text-white py-24 sm:py-32 overflow-hidden">
      {/* Editorial top and bottom border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-zinc-800" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-zinc-800" />

      {/* Dot-grid backdrop with an orange glow behind the band */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid-dark opacity-50" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full glow-orange opacity-60" />

      {/* Background Grid Accent */}
      <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full w-full grid grid-cols-12 gap-8 border-x border-zinc-800/40 opacity-20">
          <div className="hidden lg:block col-span-4 border-r border-zinc-800/40" />
          <div className="hidden lg:block col-span-4 border-r border-zinc-800/40" />
          <div className="hidden lg:block col-span-4" />
        </div>
      </div>

      {/* 3D grid floor along the bottom edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-40 h-80 overflow-hidden perspective-1200 opacity-60">
        <div className="floor-3d absolute inset-x-[-10%] top-0 h-[440px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-3"
          >
            <span aria-hidden="true" className="h-px w-8 bg-[#CF6A12]" />
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#CF6A12] uppercase"><LocalizedText>
              Operational Precision
            </LocalizedText></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight-editorial text-white"
          ><LocalizedText>
            Security facts, not vanity metrics.
          </LocalizedText></motion.h2>
        </div>

        {/* 3 stat blocks fanned in perspective, flattening on hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 perspective-1200">
          {stats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.15}>
              <div
                className={`group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] depth-dark px-6 py-12 sm:px-8 md:py-16 flex flex-col justify-between transition-transform duration-500 hover:[transform:rotateY(0deg)] ${
                  idx === 0
                    ? "md:[transform:rotateY(-6deg)]"
                    : idx === 2
                      ? "md:[transform:rotateY(6deg)]"
                      : ""
                }`}
              >
                {/* Orange top accent */}
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#CF6A12] to-transparent" />
                {/* Glow pooled in the top corner */}
                <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-10 h-36 w-48 rounded-full glow-orange opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

                <div className="relative">
                  {/* Big Number */}
                  <div className="font-serif text-7xl sm:text-8xl lg:text-9xl font-normal text-white leading-none tracking-tight">
                    <LocalizedText>{stat.number}</LocalizedText>
                  </div>

                  {/* Exact Label */}
                  <div className="mt-4 font-mono text-sm sm:text-base uppercase tracking-wider text-[#CF6A12] font-medium">
                    <LocalizedText>{stat.label}</LocalizedText>
                  </div>
                </div>

                {/* Sub-description */}
                <p className="relative mt-6 text-sm text-zinc-400 font-sans leading-relaxed">
                  <LocalizedText>{stat.sub}</LocalizedText>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Note below */}
        <div className="mt-10 text-center sm:text-left">
          <span className="font-mono text-xs text-zinc-500"><LocalizedText>
            Current implementation values. Institutional policies may refine retention before formal adoption.
          </LocalizedText></span>
        </div>

      </div>
    </section>
  );
}
