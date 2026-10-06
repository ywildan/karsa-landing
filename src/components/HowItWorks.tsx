import { LocalizedText } from "../i18n/LanguageContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Smartphone, 
  CheckCircle, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Layers
} from "lucide-react";

export function HowItWorks() {
  // Step 1 Interactive State
  const [selectedStudent, setSelectedStudent] = useState("Aditya P.");
  const [selectedCategory, setSelectedCategory] = useState("Pertanyaan (1 pt)");
  const [awardedSuccess, setAwardedSuccess] = useState(false);

  // Step 3 Interactive Student State
  const [activeCourseTab, setActiveCourseTab] = useState<"sd" | "pw" | "bd">("sd");

  const handleSimulateAward = () => {
    setAwardedSuccess(true);
    setTimeout(() => setAwardedSuccess(false), 2400);
  };

  return (
    <section id="workflow" className="relative bg-[#FAFAFA] py-24 sm:py-32 border-b border-zinc-200/60 overflow-hidden">
      
      {/* Background Subtle Lines */}
      <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full w-full grid grid-cols-12 gap-8 border-x border-zinc-200/40 opacity-30">
          <div className="hidden lg:block col-span-4 border-r border-zinc-200/40" />
          <div className="hidden lg:block col-span-4 border-r border-zinc-200/40" />
          <div className="hidden lg:block col-span-4" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="font-mono text-xs font-medium tracking-widest text-[#CF6A12] uppercase"><LocalizedText>
              03 — Workflow
            </LocalizedText></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-[52px] leading-[1.05] tracking-tight-editorial text-zinc-950"
          ><LocalizedText>
            Three steps from question
            </LocalizedText><br />
            <span className="italic font-normal text-zinc-700"><LocalizedText>to accountable record.</LocalizedText></span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-base sm:text-lg text-zinc-600 font-sans"
          ><LocalizedText>
            Designed specifically for lecture halls at UNTIDAR. No complex menus, zero cognitive overhead.
          </LocalizedText></motion.p>
        </div>

        {/* 3-Step Grid (Horizontal Desktop / Vertical Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* ──────────────── STEP 01 ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-xs relative"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4">
              <span className="font-mono text-xs font-semibold text-[#CF6A12] uppercase tracking-wider"><LocalizedText>
                Step 01
              </LocalizedText></span>
              <span className="font-mono text-[11px] text-zinc-400"><LocalizedText>Mobile PJ View</LocalizedText></span>
            </div>

            <div className="mb-4">
              <h3 className="font-serif text-2xl text-zinc-900 tracking-tight"><LocalizedText>
                The instructor opens Karsa
              </LocalizedText></h3>
              <p className="mt-1 font-mono text-xs text-zinc-500"><LocalizedText>
                Three taps from phone to point.
              </LocalizedText></p>
            </div>

            {/* Visual: Interactive Phone Bottom Sheet Mockup */}
            <div className="mt-auto pt-3">
              <div className="rounded-xl border border-zinc-200/90 bg-zinc-900 p-3 text-white shadow-inner">
                {/* Simulated Phone Bar */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="h-3 w-3 text-[#CF6A12]" />
                    <span><LocalizedText>IF2204 • Kelas 02</LocalizedText></span>
                  </div>
                  <span><LocalizedText>Sesi 08</LocalizedText></span>
                </div>

                {/* Bottom Sheet Modal Container */}
                <div className="mt-2.5 rounded-lg bg-zinc-800/90 p-2.5 border border-zinc-700/60">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5"><LocalizedText>
                    1. Tap Student Name
                  </LocalizedText></div>
                  <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                    {["Aditya P.", "Bima Arya", "Citra Dewi", "Dimas S."].map((student) => (
                      <button
                        key={student}
                        onClick={() => setSelectedStudent(student)}
                        className={`text-left px-2 py-1.5 rounded text-xs font-medium transition-all ${
                          selectedStudent === student
                            ? "bg-[#CF6A12] text-white ring-1 ring-orange-400"
                            : "bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700"
                        }`}
                      >
                        <LocalizedText>{student}</LocalizedText>
                      </button>
                    ))}
                  </div>

                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5"><LocalizedText>
                    2. Select Participation Type
                  </LocalizedText></div>
                  <div className="grid grid-cols-1 gap-1 mb-3">
                    {[
                      { name: "Pertanyaan (1 pt)", desc: "Menanyakan konsep materi" },
                      { name: "Jawaban (2 pts)", desc: "Menjawab diskusi dosen" },
                      { name: "Presentasi (4 pts)", desc: "Pemaparan hasil studi kasus" },
                    ].map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`flex items-center justify-between px-2 py-1 rounded text-[11px] transition-colors ${
                          selectedCategory === cat.name
                            ? "bg-zinc-950 text-zinc-100 border border-zinc-600"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <span><LocalizedText>{cat.name}</LocalizedText></span>
                        <span className="text-[9px] font-mono text-zinc-500"><LocalizedText>{cat.desc}</LocalizedText></span>
                      </button>
                    ))}
                  </div>

                  {/* Commit Button */}
                  <button
                    onClick={handleSimulateAward}
                    className={`w-full py-1.5 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                      awardedSuccess
                        ? "bg-emerald-600 text-white"
                        : "bg-[#CF6A12] hover:bg-[#B85B0D] text-white"
                    }`}
                  >
                    {awardedSuccess ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span><LocalizedText>Awarded to <LocalizedText></LocalizedText>{selectedStudent}</LocalizedText>!</span>
                      </>
                    ) : (
                      <>
                        <span><LocalizedText>Award Point Now</LocalizedText></span>
                        <ArrowRight className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ──────────────── STEP 02 ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-xs relative"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4">
              <span className="font-mono text-xs font-semibold text-[#CF6A12] uppercase tracking-wider"><LocalizedText>
                Step 02
              </LocalizedText></span>
              <span className="font-mono text-[11px] text-zinc-400"><LocalizedText>Server Execution</LocalizedText></span>
            </div>

            <div className="mb-4">
              <h3 className="font-serif text-2xl text-zinc-900 tracking-tight"><LocalizedText>
                The system validates
              </LocalizedText></h3>
              <p className="mt-1 font-mono text-xs text-zinc-500"><LocalizedText>
                Server-side. Every time. No exceptions.
              </LocalizedText></p>
            </div>

            {/* Visual: Minimal Minimalist SVG/CSS Architecture Flow */}
            <div className="mt-auto pt-3">
              <div className="rounded-xl border border-zinc-200/90 bg-zinc-50 p-4 font-mono text-xs">
                
                <div className="space-y-2.5">
                  {/* Flow Item 1 */}
                  <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#CF6A12]" />
                      <span className="font-medium text-zinc-800 text-[11px]"><LocalizedText>Incoming Action Payload</LocalizedText></span>
                    </div>
                    <span className="text-[10px] text-zinc-400"><LocalizedText>POST /api/award</LocalizedText></span>
                  </div>

                  <div className="flex justify-center text-zinc-400">
                    <span className="text-xs">↓</span>
                  </div>

                  {/* Flow Item 2: Security Guard */}
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-2.5 text-[11px]">
                    <div className="flex items-center justify-between font-medium text-emerald-900">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                        <span><LocalizedText>Domain &amp; Role Guard</LocalizedText></span>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-700"><LocalizedText>200 OK</LocalizedText></span>
                    </div>
                    <div className="mt-1 text-[10px] text-emerald-700"><LocalizedText>
                      Verifies PJ assignment for IF2204 Kelas 02
                    </LocalizedText></div>
                  </div>

                  <div className="flex justify-center text-zinc-400">
                    <span className="text-xs">↓</span>
                  </div>

                  {/* Flow Item 3: Audited Point Record */}
                  <div className="rounded-lg border border-zinc-200 bg-white p-2.5">
                    <div className="flex items-center justify-between text-[11px] text-zinc-900">
                      <div className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-zinc-600" />
                        <span className="font-semibold"><LocalizedText>Audited Point Record</LocalizedText></span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400"><LocalizedText>0.038s</LocalizedText></span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-500">
                      <span><LocalizedText>PJ + class context recorded</LocalizedText></span>
                      <span className="text-[#CF6A12] font-semibold"><LocalizedText>+2 points saved</LocalizedText></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* ──────────────── STEP 03 ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-xs relative"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4">
              <span className="font-mono text-xs font-semibold text-[#CF6A12] uppercase tracking-wider"><LocalizedText>
                Step 03
              </LocalizedText></span>
              <span className="font-mono text-[11px] text-zinc-400"><LocalizedText>Student Desktop View</LocalizedText></span>
            </div>

            <div className="mb-4">
              <h3 className="font-serif text-2xl text-zinc-900 tracking-tight"><LocalizedText>
                The student sees
              </LocalizedText></h3>
              <p className="mt-1 font-mono text-xs text-zinc-500"><LocalizedText>
                Real-time. Transparent. Fair.
              </LocalizedText></p>
            </div>

            {/* Visual: Rapor Card with Animated Progress Bar */}
            <div className="mt-auto pt-3">
              <div className="rounded-xl border border-zinc-200/90 bg-white p-3.5 font-sans shadow-2xs">
                
                {/* Top User Bar */}
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-[#CF6A12] font-mono text-xs font-bold"><LocalizedText>
                      AP
                    </LocalizedText></div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 leading-none"><LocalizedText>
                        Aditya Pratama N.
                      </LocalizedText></div>
                      <div className="font-mono text-[10px] text-zinc-400 mt-0.5"><LocalizedText>
                        NPM: 2210501001
                      </LocalizedText></div>
                    </div>
                  </div>

                  <div className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] text-emerald-700 border border-emerald-200/60 flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    <span><LocalizedText>Rank #3</LocalizedText></span>
                  </div>
                </div>

                {/* Course Switcher Tabs */}
                <div className="flex gap-1 mb-3">
                  {[
                    { id: "sd", name: "Struktur Data", pts: "36" },
                    { id: "pw", name: "Pemrog Web", pts: "28" },
                    { id: "bd", name: "Basis Data", pts: "22" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCourseTab(tab.id as "sd" | "pw" | "bd")}
                      className={`flex-1 rounded px-1.5 py-1 text-center font-mono text-[10px] transition-colors ${
                        activeCourseTab === tab.id
                          ? "bg-zinc-900 text-white font-medium"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      <LocalizedText>{tab.name}</LocalizedText>
                    </button>
                  ))}
                </div>

                {/* Rapor Score Breakdown */}
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span className="text-zinc-600"><LocalizedText>Total Keaktifan</LocalizedText></span>
                      <span className="font-semibold text-[#CF6A12]">
                        <LocalizedText>{activeCourseTab === "sd" ? "36 / 40 pts" : activeCourseTab === "pw" ? "28 / 35 pts" : "22 / 30 pts"}</LocalizedText>
                      </span>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#CF6A12] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{
                          width: activeCourseTab === "sd" ? "90%" : activeCourseTab === "pw" ? "80%" : "73%",
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1 pt-1.5 text-center font-mono text-[10px] text-zinc-500">
                    <div className="rounded bg-zinc-50 p-1 border border-zinc-100">
                      <div className="font-bold text-zinc-800">
                        <LocalizedText>{activeCourseTab === "sd" ? "8" : "5"}</LocalizedText>
                      </div>
                      <div className="text-[9px] text-zinc-400"><LocalizedText>Pertanyaan</LocalizedText></div>
                    </div>
                    <div className="rounded bg-zinc-50 p-1 border border-zinc-100">
                      <div className="font-bold text-zinc-800">
                        <LocalizedText>{activeCourseTab === "sd" ? "6" : "4"}</LocalizedText>
                      </div>
                      <div className="text-[9px] text-zinc-400"><LocalizedText>Jawaban</LocalizedText></div>
                    </div>
                    <div className="rounded bg-zinc-50 p-1 border border-zinc-100">
                      <div className="font-bold text-zinc-800">
                        <LocalizedText>{activeCourseTab === "sd" ? "4" : "3"}</LocalizedText>
                      </div>
                      <div className="text-[9px] text-zinc-400"><LocalizedText>Presentasi</LocalizedText></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
