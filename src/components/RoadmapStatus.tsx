import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Calendar, ChevronRight } from "lucide-react";

export function RoadmapStatus() {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(2);

  const timelineItems = [
    {
      id: 0,
      phase: "Fase 1–3",
      status: "done",
      statusLabel: "Completed",
      title: "Foundation, auth, admin panel, point input",
      desc: "Core PostgreSQL schema, Google Workspace OAuth restricted to @students.untidar.ac.id, admin course/class roster builder, and mobile PJ input bottom sheet.",
      deliverables: ["Next.js App Router API", "Role-based authorization", "Single-tap point scoring engine"],
    },
    {
      id: 1,
      phase: "Fase 4A–4B",
      status: "done",
      statusLabel: "Completed",
      title: "Student report, class leaderboard",
      desc: "Student personal rapor view with course-level drilldown, masked leaderboard ranking, and encrypted session audit receipts.",
      deliverables: ["Privacy-preserving masking", "Weighted activity distribution", "Responsive desktop rapor"],
    },
    {
      id: 2,
      phase: "Fase 4C (Current)",
      status: "done",
      statusLabel: "Completed",
      title: "Semester recap & export",
      desc: "Automated aggregation engine across all 14 lecture sessions, formula configuration for SIAKAD grading rubrics, and high-performance Excel/CSV batch export.",
      deliverables: ["SIAKAD 1-click exporter", "Faculty aggregate recap", "PJ verification signature hashes"],
    },
    {
      id: 3,
      phase: "Fase 5",
      status: "active",
      statusLabel: "Active Development",
      title: "Security hardening",
      desc: "Penetration testing, rate-limiting guards against high-concurrency classroom submission spikes, and UNTIDAR SSO SAML integration audits.",
      deliverables: ["Cloudflare Turnstile token guards", "Zero-trust session revocations", "Load testing at 5,000 req/min"],
    },
    {
      id: 4,
      phase: "Fase 6",
      status: "launch",
      statusLabel: "Target Launch",
      title: "Academic year 2026/2027",
      desc: "Official university-wide deployment across all 6 faculties (Teknik, Ekonomi, FKIP, FISIPOL, FAPERTA) at Universitas Tidar Magelang.",
      deliverables: ["University-wide onboarding", "Dosen training guidelines", "Production deployment"],
    },
  ];

  return (
    <section id="status" className="relative bg-white py-24 sm:py-32 border-b border-zinc-200/60 overflow-hidden">
      
      {/* Editorial Guide Lines */}
      <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full w-full grid grid-cols-12 gap-8 border-x border-zinc-200/40 opacity-30">
          <div className="hidden lg:block col-span-5 border-r border-zinc-200/40" />
          <div className="hidden lg:block col-span-7" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 sticky lg:top-28"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs font-medium tracking-widest text-[#CF6A12] uppercase">
                05 — Status
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[52px] leading-[1.05] tracking-tight-editorial text-zinc-950">
              In active development.
            </h2>

            <p className="mt-4 text-base text-zinc-600 font-sans leading-relaxed">
              Karsa is currently in <strong className="text-zinc-900 font-semibold">Fase 5 of 6</strong>. The core ledger and mobile awarding engines are operational, with pilot testing scheduled for upcoming semester cohorts at Universitas Tidar.
            </p>

            {/* Current Phase Card */}
            <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-500">Overall Progress</span>
                <span className="font-semibold text-[#CF6A12]">83% completed</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#CF6A12] rounded-full w-[83%]" />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#CF6A12]" />
                  Launch: Semester Ganjil 2026/2027
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 Cols) - Vertical Editorial Timeline */}
          <div className="lg:col-span-7">
            <div className="relative border-l border-zinc-200 pl-6 sm:pl-8 space-y-8">
              
              {timelineItems.map((item, idx) => {
                const isSelected = selectedMilestone === item.id;
                
                return (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setSelectedMilestone(isSelected ? null : item.id)}
                    className="relative cursor-pointer group"
                  >
                    {/* Node Dot on vertical line */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                        item.status === "done"
                          ? "bg-zinc-900 border-zinc-900 text-white"
                          : item.status === "active"
                          ? "bg-[#CF6A12] border-[#CF6A12] text-white ring-4 ring-orange-100"
                          : "bg-white border-zinc-300 text-zinc-300 group-hover:border-zinc-400"
                      }`}
                    >
                      {item.status === "done" ? (
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      ) : item.status === "active" ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      ) : (
                        <span className="h-1 w-1 rounded-full bg-zinc-300" />
                      )}
                    </div>

                    {/* Content Box */}
                    <div className={`rounded-xl border p-5 transition-all duration-200 ${
                      isSelected 
                        ? "border-zinc-300 bg-[#FAFAFA] shadow-xs" 
                        : "border-zinc-200/80 bg-white hover:border-zinc-300 hover:bg-zinc-50/50"
                    }`}>
                      
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                            {item.phase}
                          </span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${
                            item.status === "done"
                              ? "bg-zinc-100 text-zinc-700"
                              : item.status === "active"
                              ? "bg-orange-50 text-[#CF6A12] border border-orange-200/60"
                              : "bg-zinc-100 text-zinc-500"
                          }`}>
                            {item.status === "active" && <Clock className="h-2.5 w-2.5 animate-spin" />}
                            {item.statusLabel}
                          </span>
                        </div>

                        <ChevronRight className={`h-4 w-4 text-zinc-400 transition-transform ${isSelected ? "rotate-90 text-zinc-700" : ""}`} />
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-zinc-900 tracking-tight">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-sm text-zinc-600 font-sans leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Expandable deliverables on click */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-zinc-200/70"
                        >
                          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                            Key Deliverables & Specifications:
                          </div>
                          <ul className="space-y-1.5 font-mono text-xs text-zinc-700">
                            {item.deliverables.map((d) => (
                              <li key={d} className="flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-[#CF6A12]" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>

                  </motion.div>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
