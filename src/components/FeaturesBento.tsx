import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Lock, 
  FileSpreadsheet, 
  Users, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Smartphone, 
  DatabaseZap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface FeaturesBentoProps {
  onOpenExportPreview: () => void;
}

export function FeaturesBento({ onOpenExportPreview }: FeaturesBentoProps) {
  // State for privacy masking toggle in Leaderboard cell
  const [maskNames, setMaskNames] = useState(true);

  // State for interactive 3-tap mock
  const [tappedStep, setTappedStep] = useState(1);
  const [demoPointAwarded, setDemoPointAwarded] = useState(false);

  // State for domain auth test
  const [testEmail, setTestEmail] = useState("budi.santoso@students.untidar.ac.id");

  // State for multi-role selector
  const [activeRole, setActiveRole] = useState<"pj" | "student">("pj");

  const isEmailValid = testEmail.endsWith("@students.untidar.ac.id") || testEmail.endsWith("@untidar.ac.id");

  return (
    <section id="capabilities" className="relative bg-white py-24 sm:py-32 border-b border-zinc-200/60 overflow-hidden">
      
      {/* Editorial Guide Lines */}
      <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full w-full grid grid-cols-12 gap-8 border-x border-zinc-200/40 opacity-30">
          <div className="hidden lg:block col-span-4 border-r border-zinc-200/40" />
          <div className="hidden lg:block col-span-8" />
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
            <span className="font-mono text-xs font-medium tracking-widest text-[#CF6A12] uppercase">
              04 — System Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-[52px] leading-[1.05] tracking-tight-editorial text-zinc-950"
          >
            Engineered for classroom reality.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-base sm:text-lg text-zinc-600 font-sans"
          >
            No generic SaaS abstractions. Every feature maps directly to Universitas Tidar academic bylaws and classroom dynamics.
          </motion.p>
        </div>

        {/* Bento Grid (6 Cells) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          
          {/* ──────────────── CELL 1 (Big Cell, Top-Left, Spans 2 Rows on Desktop) ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:row-span-2 flex flex-col justify-between rounded-xl border border-zinc-200 bg-[#FAFAFA] p-6 hover:border-zinc-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-3">
                <span className="text-[#CF6A12] font-semibold">CORE INTERACTION</span>
                <span>0.8s avg speed</span>
              </div>

              <h3 className="font-serif text-3xl text-zinc-950 tracking-tight">
                3-Tap Input
              </h3>

              <p className="mt-3 text-sm text-zinc-600 leading-relaxed font-sans">
                Designed specifically for mobile screens in lecture halls. A PJ can award points to any student in under two seconds without looking away from the speaker.
              </p>
            </div>

            {/* Inline Interactive Mock */}
            <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2 mb-3">
                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-700">
                  <Smartphone className="h-3.5 w-3.5 text-[#CF6A12]" />
                  <span>Interactive 3-Tap Test</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400">Step {tappedStep}/3</span>
              </div>

              <div className="space-y-2">
                {/* Tap 1: Select Student */}
                <div className={`p-2 rounded border transition-all ${tappedStep === 1 ? "border-[#CF6A12] bg-orange-50/40" : "border-zinc-200 bg-zinc-50 opacity-70"}`}>
                  <div className="text-[10px] font-mono text-zinc-500 mb-1">TAP 1 • Choose student</div>
                  <button
                    onClick={() => setTappedStep(2)}
                    className="w-full text-left text-xs font-medium text-zinc-900 bg-white border border-zinc-200 rounded px-2.5 py-1 hover:border-zinc-400"
                  >
                    Aditya Pratama (2210501001)
                  </button>
                </div>

                {/* Tap 2: Select Action */}
                <div className={`p-2 rounded border transition-all ${tappedStep === 2 ? "border-[#CF6A12] bg-orange-50/40" : "border-zinc-200 bg-zinc-50 opacity-70"}`}>
                  <div className="text-[10px] font-mono text-zinc-500 mb-1">TAP 2 • Select category</div>
                  <div className="flex gap-1.5">
                    {["Tanya (+1)", "Jawab (+2)", "Present (+4)"].map((act, i) => (
                      <button
                        key={act}
                        disabled={tappedStep < 2}
                        onClick={() => setTappedStep(3)}
                        className={`text-[10px] font-mono flex-1 py-1 px-1 rounded text-center transition-colors ${
                          i === 1 && tappedStep >= 2 ? "bg-zinc-900 text-white" : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                        }`}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tap 3: Confirm */}
                <div className={`p-2 rounded border transition-all ${tappedStep === 3 ? "border-[#CF6A12] bg-orange-50/40" : "border-zinc-200 bg-zinc-50 opacity-70"}`}>
                  <div className="text-[10px] font-mono text-zinc-500 mb-1">TAP 3 • Commit to ledger</div>
                  <button
                    disabled={tappedStep < 3}
                    onClick={() => {
                      setDemoPointAwarded(true);
                      setTimeout(() => {
                        setDemoPointAwarded(false);
                        setTappedStep(1);
                      }, 2000);
                    }}
                    className={`w-full py-1.5 rounded text-xs font-medium text-center transition-all ${
                      demoPointAwarded
                        ? "bg-emerald-600 text-white"
                        : tappedStep === 3
                        ? "bg-[#CF6A12] text-white hover:bg-[#B85B0D]"
                        : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                    }`}
                  >
                    {demoPointAwarded ? "✓ Points Recorded in 0.04s!" : "Confirm & Award"}
                  </button>
                </div>
              </div>

              <div className="mt-3 text-center">
                <button
                  onClick={() => { setTappedStep(1); setDemoPointAwarded(false); }}
                  className="font-mono text-[10px] text-zinc-400 hover:text-zinc-600 underline"
                >
                  Reset simulator
                </button>
              </div>
            </div>
          </motion.div>

          {/* ──────────────── CELL 2 (Wide Cell, Top-Right, Spans 2 Columns on Desktop) ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-2">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> PRIVACY BY DESIGN
                </span>
                <button
                  onClick={() => setMaskNames(!maskNames)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#CF6A12] hover:underline"
                >
                  {maskNames ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  <span>{maskNames ? "Masking ON" : "Masking OFF"}</span>
                </button>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 tracking-tight">
                Class-scoped leaderboard
              </h3>

              <p className="mt-2 text-sm text-zinc-600 leading-relaxed font-sans max-w-xl">
                Every student sees only their class. Names masked for privacy to maintain peer encouragement without individual exposure.
              </p>
            </div>

            {/* Masked Leaderboard Preview Table */}
            <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50/60 overflow-hidden font-mono text-xs">
              <div className="grid grid-cols-12 bg-zinc-100/90 py-2 px-3 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold border-b border-zinc-200">
                <div className="col-span-2">Rank</div>
                <div className="col-span-6">Student ID / Display</div>
                <div className="col-span-2 text-center">Interactions</div>
                <div className="col-span-2 text-right">Points</div>
              </div>

              <div className="divide-y divide-zinc-100">
                {[
                  { rank: "#1", name: maskNames ? "G*** Maharani" : "Gita Maharani", npm: maskNames ? "2210501***" : "2210501007", count: 17, pts: 38 },
                  { rank: "#2", name: maskNames ? "A*** Pratama" : "Aditya Pratama", npm: maskNames ? "2210501***" : "2210501001", count: 18, pts: 36 },
                  { rank: "#3", name: maskNames ? "C*** Dewi" : "Citra Dewi", npm: maskNames ? "2210501***" : "2210501003", count: 14, pts: 29 },
                ].map((row, idx) => (
                  <div key={row.rank} className="grid grid-cols-12 py-2 px-3 items-center hover:bg-white transition-colors">
                    <div className="col-span-2 font-bold text-zinc-900">
                      {row.rank}
                    </div>
                    <div className="col-span-6 flex items-center gap-2">
                      <span className="font-medium text-zinc-900">{row.name}</span>
                      <span className="text-[10px] text-zinc-400">({row.npm})</span>
                      {idx === 1 && (
                        <span className="rounded bg-orange-100 text-[#CF6A12] px-1 py-0.2 text-[9px]">You</span>
                      )}
                    </div>
                    <div className="col-span-2 text-center text-zinc-600">{row.count}</div>
                    <div className="col-span-2 text-right font-semibold text-[#CF6A12]">{row.pts} pts</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ──────────────── CELL 3 (Small Cell: Multi-role) ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 transition-colors"
          >
            <div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 mb-2">
                <Users className="h-3.5 w-3.5 text-[#CF6A12]" />
                <span>ROLE BOUNDARIES</span>
              </div>

              <h3 className="font-serif text-2xl text-zinc-950 tracking-tight">
                Multi-role
              </h3>

              <p className="mt-1 text-sm text-zinc-600 leading-relaxed font-sans">
                PJ. Student. One system.
              </p>
            </div>

            {/* Interactive Role Pills */}
            <div className="mt-5 space-y-2">
              <div className="flex rounded-lg bg-zinc-100 p-1 font-mono text-[11px]">
                {(["pj", "student"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRole(r)}
                    className={`flex-1 py-1 capitalize rounded transition-colors ${
                      activeRole === r ? "bg-white text-zinc-900 font-medium shadow-2xs" : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs text-zinc-600">
                {activeRole === "pj" && (
                  <div>
                    <div className="font-semibold text-zinc-900">PJ Penanggung Jawab</div>
                    <p className="mt-0.5 text-[11px] text-zinc-500">Fast classroom awarding access locked to assigned class only.</p>
                  </div>
                )}
                {activeRole === "student" && (
                  <div>
                    <div className="font-semibold text-zinc-900">Student Self-Audit</div>
                    <p className="mt-0.5 text-[11px] text-zinc-500">Personal rapor, score breakdown, masked class leaderboard.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* ──────────────── CELL 4 (Small Cell: Excel Export) ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 transition-colors"
          >
            <div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 mb-2">
                <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-700" />
                <span>ACADEMIC RECAP</span>
              </div>

              <h3 className="font-serif text-2xl text-zinc-950 tracking-tight">
                Excel export
              </h3>

              <p className="mt-1 text-sm text-zinc-600 leading-relaxed font-sans">
                Per class. Per semester. One click.
              </p>
            </div>

            <div className="mt-5">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-700">
                  <span>KARSA_REKAP_2026.xlsx</span>
                  <span className="text-emerald-700 font-semibold">READY</span>
                </div>
                <div className="mt-1 text-[11px] text-zinc-500">
                  Structured recap for review and follow-up by the academic administrator.
                </div>
              </div>

              <button
                onClick={onOpenExportPreview}
                className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white py-1.5 font-sans text-xs font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
              >
                <span>View Export Layout Preview</span>
                <span className="text-zinc-400">↗</span>
              </button>
            </div>
          </motion.div>

          {/* ──────────────── CELL 5 (Wide Cell, Bottom, Spans 2 Columns on Desktop) ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 transition-colors"
          >
            <div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 mb-2">
                <Lock className="h-3.5 w-3.5 text-[#CF6A12]" />
                <span>GOOGLE OAUTH</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 tracking-tight">
                Domain-locked auth
              </h3>

              <p className="mt-1 text-sm text-zinc-600 leading-relaxed font-sans">
                Only @students.untidar.ac.id and @untidar.ac.id can sign in. Outside accounts are rejected at the OAuth gateway before session creation.
              </p>
            </div>

            {/* Email Validator Simulator */}
            <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50/80 p-3.5 font-mono text-xs">
              <div className="text-[10px] uppercase text-zinc-500 tracking-wider mb-1.5">
                Test Domain Validation Gateway
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-900 focus:outline-none focus:border-[#CF6A12]"
                  placeholder="Enter email to test SSO lock..."
                />
                <div className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold ${
                  isEmailValid ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                }`}>
                  {isEmailValid ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Access Granted</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>403 Access Denied</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ──────────────── CELL 6 (Small Cell, Bottom-Right: Zero Paper) ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-[#FAFAFA] p-6 hover:border-zinc-300 transition-colors"
          >
            <div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 mb-2">
                <DatabaseZap className="h-3.5 w-3.5 text-[#CF6A12]" />
                <span>AUDITABLE HISTORY</span>
              </div>

              <h3 className="font-serif text-2xl text-zinc-950 tracking-tight">
                Zero paper
              </h3>

              <p className="mt-1 text-sm text-zinc-600 leading-relaxed font-sans">
                Every important change, traceable.
              </p>
            </div>

            <div className="mt-5 rounded-lg border border-zinc-200 bg-white p-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-700 text-[11px]">
                <span>Ledger Integrity</span>
                <span className="text-emerald-700 font-bold">Snapshot-backed</span>
              </div>
              <div className="mt-1.5 text-[10px] text-zinc-400">
                Point activity records timestamp, PJ identity, class context, and an audit snapshot for important changes.
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
