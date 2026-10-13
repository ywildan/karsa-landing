import { LocalizedText } from "../i18n/LanguageContext";
import { Compass, BookCheck, Shield } from "lucide-react";
import { Tilt } from "./fx/Tilt";
import { Reveal } from "./fx/Reveal";

export function TheIdea() {
  return (
    <section id="idea" className="relative bg-white py-24 sm:py-32 border-b border-zinc-200/60 overflow-hidden">
      {/* Dot-grid backdrop with a soft orange glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid-light opacity-60" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full glow-orange opacity-50" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 -left-32 h-80 w-80 rounded-full glow-orange opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">

          {/* Left: the statement */}
          <div className="lg:col-span-7 max-w-[720px]">
            {/* Label */}
            <Reveal className="flex items-center gap-2 mb-6">
              <span aria-hidden="true" className="h-px w-8 bg-[#CF6A12]" />
              <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#CF6A12] uppercase"><LocalizedText>
                02 — The Idea
              </LocalizedText></span>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.1}>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight-editorial text-zinc-950"><LocalizedText>
                A single record.
                </LocalizedText><br />
                <span className="italic font-normal text-zinc-700"><LocalizedText>Built with intention.</LocalizedText></span>
              </h2>
            </Reveal>

            {/* Core Body Paragraph */}
            <Reveal delay={0.2} className="mt-8 space-y-6 text-lg sm:text-xl text-zinc-600 leading-relaxed">
              <p><LocalizedText>
                Karsa was built on one principle: every act of participation — a question, an answer, a presentation — deserves a clear, accountable record. Not a grade. Not a metric. A record.
              </LocalizedText></p>

              <p className="text-base sm:text-lg text-zinc-500"><LocalizedText>
                When a student raises their hand in an amphitheater at UNTIDAR Magelang, that courage should not evaporate when the lecture bell rings. It should appear in a class record the student can review.
              </LocalizedText></p>
            </Reveal>
          </div>

          {/* Right: layered 3D stack carrying the pull quote */}
          <div className="lg:col-span-5 perspective-1200">
            <Reveal delay={0.3} className="relative preserve-3d mx-auto max-w-md lg:max-w-none">
              {/* Back panels of the stack */}
              <div aria-hidden="true" className="absolute inset-0 -rotate-3 translate-x-3 translate-y-4 rounded-3xl border border-[#CF6A12]/20 bg-[#FBF4EE]" />
              <div aria-hidden="true" className="absolute inset-0 rotate-2 -translate-x-2 translate-y-2 rounded-3xl border border-zinc-200/80 bg-white depth-sm" />

              {/* Front panel */}
              <div className="relative rounded-3xl border border-zinc-200/70 bg-white depth-lg p-8 sm:p-10 preserve-3d">
                <div aria-hidden="true" className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[#CF6A12]" />
                <div className="lg:[transform:translateZ(32px)]">
                  <blockquote className="font-serif text-2xl sm:text-3xl text-zinc-900 leading-snug italic"><LocalizedText>
                    &ldquo;The word karsa comes from Sanskrit — it means will, intention, the spirit to create.&rdquo;
                  </LocalizedText></blockquote>
                  <cite className="mt-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-[#CF6A12] not-italic"><LocalizedText>
                    Etymology & Design Philosophy
                  </LocalizedText></cite>
                </div>
              </div>

              {/* Soft orange glow pooled under the stack */}
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full glow-orange opacity-60" />
            </Reveal>
          </div>
        </div>

        {/* Three Foundational Pillars */}
        <div className="mt-20 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 perspective-1200">
          <Tilt max={6} lift={8} className="relative preserve-3d">
            <div className="relative h-full rounded-2xl border border-zinc-200/80 bg-white depth-md p-6 sm:p-7 overflow-hidden">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-[#CF6A12]" />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-900 font-medium text-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FBF4EE]">
                    <Compass className="h-4 w-4 text-[#CF6A12]" />
                  </span>
                  <span><LocalizedText>Simplicity of Act</LocalizedText></span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed"><LocalizedText>
                  Recording takes seconds so the classroom rhythm is never broken.
                </LocalizedText></p>
              </div>
            </div>
          </Tilt>

          <Tilt max={6} lift={8} className="relative preserve-3d">
            <div className="relative h-full rounded-2xl border border-zinc-200/80 bg-white depth-md p-6 sm:p-7 overflow-hidden">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-[#CF6A12]" />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-900 font-medium text-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FBF4EE]">
                    <BookCheck className="h-4 w-4 text-[#CF6A12]" />
                  </span>
                  <span><LocalizedText>Radical Clarity</LocalizedText></span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed"><LocalizedText>
                  No hidden rubrics. Every student verifies their point audit in real-time.
                </LocalizedText></p>
              </div>
            </div>
          </Tilt>

          <Tilt max={6} lift={8} className="relative preserve-3d">
            <div className="relative h-full rounded-2xl border border-zinc-200/80 bg-white depth-md p-6 sm:p-7 overflow-hidden">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-[#CF6A12]" />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-900 font-medium text-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FBF4EE]">
                    <Shield className="h-4 w-4 text-[#CF6A12]" />
                  </span>
                  <span><LocalizedText>Institutional Trust</LocalizedText></span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed"><LocalizedText>
                  Karsa applies data minimization, scoped access, and auditable
                  changes with reference to Indonesia&apos;s data protection principles.
                </LocalizedText></p>
              </div>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}
