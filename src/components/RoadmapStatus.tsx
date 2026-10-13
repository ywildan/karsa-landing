import { LocalizedText } from "../i18n/LanguageContext";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Calendar, ChevronRight } from "lucide-react";

export function RoadmapStatus() {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(3);

  const timelineItems = [
    {
      id: 0,
      phase: "Fase 1–3",
      status: "done",
      statusLabel: "Completed",
      title: "Foundation, auth, admin panel, point input",
      desc: "Core PostgreSQL schema, Google OAuth restricted to approved UNTIDAR domains, admin course/class roster builder, and PJ point input.",
      deliverables: ["Next.js App Router API", "Role-based authorization", "Single-tap point scoring engine"],
    },
    {
      id: 1,
      phase: "Fase 4A–4B",
      status: "done",
      statusLabel: "Completed",
      title: "Student report, class leaderboard",
      desc: "Student personal rapor view with course-level drilldown, class-scoped access, and masked leaderboard ranking.",
      deliverables: ["Privacy-preserving masking", "Weighted activity distribution", "Responsive desktop rapor"],
    },
    {
      id: 2,
      phase: "Fase 4C",
      status: "done",
      statusLabel: "Completed",
      title: "Semester recap & export",
      desc: "Class and semester aggregation with an Excel recap that administrators can review and use in the approved academic workflow.",
      deliverables: ["Excel recap export", "Class and semester aggregation", "Administrative audit trail"],
    },
    {
      id: 3,
      phase: "Fase 5",
      status: "active",
      statusLabel: "Active Development",
      title: "Security hardening",
      desc: "Least-privilege database access, encrypted backup and restore testing, browser hardening, native authentication safeguards, and fail-closed authorization.",
      deliverables: ["RLS and runtime role", "Encrypted backup and restore test", "Security headers and WAF observation"],
    },
    {
      id: 4,
      phase: "Fase 6",
      status: "launch",
      statusLabel: "Target Launch",
      title: "Academic year 2026/2027",
      desc: "Potential institutional rollout after formal review, approval, data-governance alignment, and a successful limited pilot.",
      deliverables: ["Institutional approval", "Documented data governance", "Phased onboarding"],
    },
  ];

  return (
    <section data-nav-theme="light" id="status" className="relative bg-white py-24 sm:py-32 border-b border-zinc-200/60 overflow-hidden">

      {/* Editorial Guide Lines */}
      <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full w-full grid grid-cols-12 gap-8 border-x border-zinc-200/40 opacity-30">
          <div className="hidden lg:block col-span-5 border-r border-zinc-200/40" />
          <div className="hidden lg:block col-span-7" />
        </div>
      </div>

      {/* 3D floor backdrop */}
      <div aria-hidden="true" className="floor-3d-light pointer-events-none absolute -bottom-16 left-0 right-0 h-64 opacity-60" />

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
              <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#CF6A12] uppercase"><LocalizedText>
                05 — Status
              </LocalizedText></span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[52px] leading-[1.05] tracking-tight-editorial text-zinc-950"><LocalizedText>
              In active development.
            </LocalizedText></h2>

            <p className="mt-4 text-base text-zinc-600 font-sans leading-relaxed"><LocalizedText>
              Karsa is currently in </LocalizedText><strong className="text-zinc-900 font-semibold"><LocalizedText>Fase 5 of 6</LocalizedText></strong><LocalizedText>. The core ledger and mobile awarding engines are operational, with pilot testing scheduled for upcoming semester cohorts at Universitas Tidar.
            </LocalizedText></p>

            {/* Current Phase Card */}
            <div className="depth-md mt-8 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-500"><LocalizedText>Overall Progress</LocalizedText></span>
                <span className="font-semibold text-[#CF6A12]"><LocalizedText>83% completed</LocalizedText></span>
              </div>
              <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#CF6A12] rounded-full w-[83%]" />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#CF6A12]" /><LocalizedText>
                  Launch: Semester Ganjil 2026/2027
                </LocalizedText></span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 Cols) - Vertical Timeline with 3D Cards */}
          <div className="perspective-1200 lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              className="relative pl-6 sm:pl-8 space-y-8"
            >
              {/* Spine: base track + orange progress */}
              <div aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-zinc-200" />
              <motion.div
                aria-hidden="true"
                variants={{
                  hidden: { scaleY: 0 },
                  visible: { scaleY: 1, transition: { duration: 1.5, ease: [0.65, 0, 0.35, 1] } },
                }}
                className="absolute -left-[1px] top-0 h-[72%] w-[3px] origin-top rounded-full bg-gradient-to-b from-[#CF6A12] via-[#CF6A12] to-[#CF6A12]/30"
              />

              {timelineItems.map((item, idx) => {
                const isSelected = selectedMilestone === item.id;

                return (
                  <motion.div
                    key={item.phase}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.55, delay: 0.05 + idx * 0.38, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setSelectedMilestone(isSelected ? null : item.id)}
                    className="preserve-3d relative cursor-pointer group"
                  >
                    {/* Node Dot on vertical line */}
                    <div
                      className={`depth-sm absolute -left-[31px] sm:-left-[39px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                        item.status === "done"
                          ? "bg-zinc-900 border-zinc-900 text-white"
                          : item.status === "active"
                          ? "bg-[#CF6A12] border-[#CF6A12] text-white ring-4 ring-orange-100"
                          : "bg-white border-zinc-300 text-zinc-300 group-hover:border-zinc-400"
                      } ${isSelected ? "scale-125" : ""}`}
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
                    <div className={`rounded-2xl border p-5 transition-all duration-300 ${item.status === "launch" ? "opacity-75 saturate-[0.65] " : ""}${
                      isSelected
                        ? "depth-lg border-zinc-300 bg-[#FAFAFA] -translate-y-0.5"
                        : "depth-sm border-zinc-200/80 bg-white hover:border-zinc-300 hover:bg-zinc-50/50 hover:-translate-y-0.5"
                    }`}>

                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                            <LocalizedText>{item.phase}</LocalizedText>
                          </span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${
                            item.status === "done"
                              ? "bg-zinc-100 text-zinc-700"
                              : item.status === "active"
                              ? "bg-orange-50 text-[#CF6A12] border border-orange-200/60"
                              : "bg-zinc-100 text-zinc-500"
                          }`}>
                            {item.status === "active" && <Clock className="h-2.5 w-2.5 animate-spin" />}
                            <LocalizedText>{item.statusLabel}</LocalizedText>
                          </span>
                        </div>

                        <ChevronRight className={`h-4 w-4 text-zinc-400 transition-transform ${isSelected ? "rotate-90 text-zinc-700" : ""}`} />
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-zinc-900 tracking-tight">
                        <LocalizedText>{item.title}</LocalizedText>
                      </h3>

                      <p className="mt-1.5 text-sm text-zinc-600 font-sans leading-relaxed">
                        <LocalizedText>{item.desc}</LocalizedText>
                      </p>

                      {/* Expandable deliverables on click */}
                      <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div
                          key="deliverables"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                        <div className="depth-sm mt-4 rounded-xl border border-zinc-200/70 bg-white p-4">
                          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2"><LocalizedText>
                            Key Deliverables & Specifications:
                          </LocalizedText></div>
                          <ul className="space-y-1.5 font-mono text-xs text-zinc-700">
                            {item.deliverables.map((d) => (
                              <li key={d} className="flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-[#CF6A12]" />
                                <span><LocalizedText>{d}</LocalizedText></span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        </motion.div>
                      )}
                      </AnimatePresence>
                    </div>

                  </motion.div>
                );
              })}

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
