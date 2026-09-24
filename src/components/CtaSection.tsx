import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Mail } from "lucide-react";

interface CtaSectionProps {
  onRequestAccess: () => void;
}

export function CtaSection({ onRequestAccess }: CtaSectionProps) {
  return (
    <section className="relative bg-[#FAFAFA] py-28 sm:py-36 border-b border-zinc-200/60 overflow-hidden">
      
      {/* Background Watermark & Editorial Accents */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
        <span className="font-serif text-[260px] sm:text-[380px] font-normal leading-none text-zinc-950/[0.03]">
          karsa
        </span>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Monospace Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-zinc-600 shadow-2xs mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" />
          INDEPENDENT PILOT • 2026/2027
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-6xl lg:text-[68px] leading-[1] tracking-tight-editorial text-zinc-950"
        >
          Designed for the UNTIDAR environment.
          <br />
          <span className="italic font-normal text-zinc-800">Ready for a controlled pilot.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg text-zinc-600 font-sans max-w-md mx-auto"
        >
          Explore the current build or request a limited pilot conversation.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <a
            href="https://www.sikarsa.id/login"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#CF6A12] px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#B85B0D] hover:shadow hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Sign in with Google</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>

          <button
            onClick={onRequestAccess}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-6 py-3.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 active:scale-[0.99]"
          >
            <Mail className="h-4 w-4 text-zinc-400" />
            <span>Request pilot cohort access</span>
          </button>
        </motion.div>

        {/* Note below */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-zinc-400"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Approved @students.untidar.ac.id and @untidar.ac.id accounts</span>
        </motion.div>

      </div>
    </section>
  );
}
