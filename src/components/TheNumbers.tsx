import { motion } from "framer-motion";

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
    <section className="relative bg-[#0A0A0A] text-white py-24 sm:py-32 overflow-hidden">
      {/* Editorial top and bottom border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-zinc-800" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-zinc-800" />

      {/* Background Grid Accent */}
      <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full w-full grid grid-cols-12 gap-8 border-x border-zinc-800/40 opacity-20">
          <div className="hidden lg:block col-span-4 border-r border-zinc-800/40" />
          <div className="hidden lg:block col-span-4 border-r border-zinc-800/40" />
          <div className="hidden lg:block col-span-4" />
        </div>
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
            <span className="font-mono text-xs font-medium tracking-widest text-[#CF6A12] uppercase">
              Operational Precision
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight-editorial text-white"
          >
            Security facts, not vanity metrics.
          </motion.h2>
        </div>

        {/* 3 Numbers Grid with Thin Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800 border-y border-zinc-800">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="py-12 md:py-16 px-6 sm:px-8 flex flex-col justify-between"
            >
              <div>
                {/* Big Number */}
                <div className="font-serif text-7xl sm:text-8xl lg:text-9xl font-normal text-white leading-none tracking-tight">
                  {stat.number}
                </div>

                {/* Exact Label */}
                <div className="mt-4 font-mono text-sm sm:text-base uppercase tracking-wider text-[#CF6A12] font-medium">
                  {stat.label}
                </div>
              </div>

              {/* Sub-description */}
              <p className="mt-6 text-sm text-zinc-400 font-sans leading-relaxed">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Note below */}
        <div className="mt-8 text-center sm:text-left">
          <span className="font-mono text-xs text-zinc-500">
            Current implementation values. Institutional policies may refine retention before formal adoption.
          </span>
        </div>

      </div>
    </section>
  );
}
