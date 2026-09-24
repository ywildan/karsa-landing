import { motion } from "framer-motion";
import { Compass, BookCheck, Shield } from "lucide-react";

export function TheIdea() {
  return (
    <section id="idea" className="relative bg-white py-24 sm:py-32 border-b border-zinc-200/60 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Editorial Column (max-w-[720px]) */}
        <div className="max-w-[720px] mx-auto">
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="font-mono text-xs font-medium tracking-widest text-[#CF6A12] uppercase">
              02 — The Idea
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight-editorial text-zinc-950"
          >
            A single record.
            <br />
            <span className="italic font-normal text-zinc-700">Built with intention.</span>
          </motion.h2>

          {/* Core Body Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 space-y-6 text-lg sm:text-xl text-zinc-600 leading-relaxed"
          >
            <p>
              Karsa was built on one principle: every act of participation — a question, an answer, a presentation — deserves a clear, accountable record. Not a grade. Not a metric. A record.
            </p>

            <p className="text-base sm:text-lg text-zinc-500">
              When a student raises their hand in an amphitheater at UNTIDAR Magelang, that courage should not evaporate when the lecture bell rings. It should appear in a class record the student can review.
            </p>
          </motion.div>

          {/* Pull Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="my-10 relative border-l-2 border-[#CF6A12] pl-6 sm:pl-8 py-3 bg-[#FBF4EE]/40 rounded-r-xl"
          >
            <blockquote className="font-serif text-2xl sm:text-3xl text-zinc-900 leading-snug italic">
              &ldquo;The word karsa comes from Sanskrit — it means will, intention, the spirit to create.&rdquo;
            </blockquote>
            <cite className="mt-3 block font-mono text-xs uppercase tracking-wider text-[#CF6A12] not-italic">
              Etymology & Design Philosophy
            </cite>
          </motion.div>

          {/* Three Foundational Pillars (Editorial Style) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-100"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-900 font-medium text-sm">
                <Compass className="h-4 w-4 text-[#CF6A12]" />
                <span>Simplicity of Act</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Recording takes seconds so the classroom rhythm is never broken.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-900 font-medium text-sm">
                <BookCheck className="h-4 w-4 text-[#CF6A12]" />
                <span>Radical Clarity</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                No hidden rubrics. Every student verifies their point audit in real-time.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-900 font-medium text-sm">
                <Shield className="h-4 w-4 text-[#CF6A12]" />
                <span>Institutional Trust</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Karsa applies data minimization, scoped access, and auditable
                changes with reference to Indonesia&apos;s data protection principles.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
