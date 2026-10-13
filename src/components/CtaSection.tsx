import { LocalizedText } from "../i18n/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { Scene3D } from "./fx/Scene3D";

interface CtaSectionProps {
  onRequestAccess: () => void;
}

export function CtaSection({ onRequestAccess }: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-28 text-white sm:py-36">
      {/* 3D backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Scene3D className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-45" density={480} />
        <div className="glow-orange absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="absolute inset-x-0 bottom-0 h-[220px] overflow-hidden">
          <div className="floor-3d absolute -inset-x-24 top-4 bottom-[-110px]" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#CF6A12]/20 animate-spin-slower" />
      </div>

      {/* Background Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden" aria-hidden="true">
        <span className="font-serif text-[260px] sm:text-[380px] font-normal leading-none text-white/[0.03]"><LocalizedText>
          karsa
        </LocalizedText></span>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center z-10">

        {/* Monospace Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass-dark inline-flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-zinc-300 mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" /><LocalizedText>
          INDEPENDENT PILOT • 2026/2027
        </LocalizedText></motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-6xl lg:text-[68px] leading-[1] tracking-tight-editorial text-white"
        ><LocalizedText>
          Designed for the UNTIDAR environment.
          </LocalizedText><br />
          <span className="italic font-normal text-[#CF6A12]"><LocalizedText>Ready for a controlled pilot.</LocalizedText></span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg text-zinc-400 font-sans max-w-md mx-auto"
        ><LocalizedText>
          Explore the current build or request a limited pilot conversation.
        </LocalizedText></motion.p>

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
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#CF6A12] px-7 py-3.5 text-sm font-medium text-white shadow-[0_16px_36px_-12px_rgba(207,106,18,0.65)] transition-all duration-200 hover:bg-[#B85B0D] hover:scale-[1.01] active:scale-[0.99]"
          >
            <span><LocalizedText>Sign in with Google</LocalizedText></span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>

          <button
            onClick={onRequestAccess}
            className="glass-dark w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10 hover:text-white active:scale-[0.99]"
          >
            <Mail className="h-4 w-4 text-zinc-400" />
            <span><LocalizedText>Request pilot cohort access</LocalizedText></span>
          </button>
        </motion.div>

        {/* Note below */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-zinc-500"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span><LocalizedText>Approved @students.untidar.ac.id and @untidar.ac.id accounts</LocalizedText></span>
        </motion.div>

      </div>
    </section>
  );
}
