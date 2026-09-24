import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Monitor, 
  Plus, 
  History, 
  Sparkles, 
  Award, 
  RotateCcw,
  CheckCircle2
} from "lucide-react";

interface StudentRecord {
  id: string;
  name: string;
  maskedName: string;
  npm: string;
  questions: number;
  answers: number;
  presentations: number;
  totalPoints: number;
}

interface AuditLog {
  id: string;
  studentName: string;
  category: string;
  points: number;
  time: string;
  reference: string;
}

export function InteractiveSandbox() {
  const initialStudents: StudentRecord[] = [
    { id: "1", name: "Gita Maharani", maskedName: "G*** Maharani", npm: "2210501007", questions: 6, answers: 7, presentations: 4, totalPoints: 36 },
    { id: "2", name: "Aditya Pratama", maskedName: "A*** Pratama", npm: "2210501001", questions: 7, answers: 5, presentations: 3, totalPoints: 29 },
    { id: "3", name: "Citra Dewi", maskedName: "C*** Dewi", npm: "2210501003", questions: 5, answers: 4, presentations: 2, totalPoints: 21 },
    { id: "4", name: "Bima Arya", maskedName: "B*** Arya", npm: "2210501002", questions: 4, answers: 3, presentations: 1, totalPoints: 14 },
    { id: "5", name: "Eka Putri", maskedName: "E*** Putri", npm: "2210501005", questions: 2, answers: 2, presentations: 1, totalPoints: 10 },
  ];

  const [students, setStudents] = useState<StudentRecord[]>(initialStudents);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("2"); // default to Aditya
  const [activeTab, setActiveTab] = useState<"pj-mobile" | "student-desktop">("pj-mobile");
  const [awardFeedback, setAwardFeedback] = useState<string | null>(null);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: "log-1",
      studentName: "Aditya Pratama",
      category: "Pertanyaan (Tanya)",
      points: 1,
      time: "10:32 WIB",
      reference: "EVT-1032-A",
    },
    {
      id: "log-2",
      studentName: "Gita Maharani",
      category: "Presentasi Kelompok",
      points: 4,
      time: "10:15 WIB",
      reference: "EVT-1015-B",
    },
  ]);

  const awardPoints = (catName: string, pts: number) => {
    const student = students.find((s) => s.id === selectedStudentId);
    if (!student) return;

    const newLogs: AuditLog = {
      id: `log-${Date.now()}`,
      studentName: student.name,
      category: catName,
      points: pts,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB",
      reference: `EVT-${Date.now().toString().slice(-6)}`,
    };

    setAuditLogs([newLogs, ...auditLogs.slice(0, 4)]);

    setStudents((prev) =>
      prev
        .map((s) => {
          if (s.id === selectedStudentId) {
            return {
              ...s,
              questions: catName.includes("Tanya") ? s.questions + 1 : s.questions,
              answers: catName.includes("Jawab") ? s.answers + 1 : s.answers,
              presentations: catName.includes("Presentasi") ? s.presentations + 1 : s.presentations,
              totalPoints: s.totalPoints + pts,
            };
          }
          return s;
        })
        .sort((a, b) => b.totalPoints - a.totalPoints)
    );

    setAwardFeedback(`+${pts} pts recorded for ${student.name}`);
    setTimeout(() => setAwardFeedback(null), 2500);
  };

  const resetSandbox = () => {
    setStudents(initialStudents);
    setSelectedStudentId("2");
    setAwardFeedback(null);
  };

  const currentSelectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const currentRank = students.findIndex((s) => s.id === selectedStudentId) + 1;

  return (
    <section className="relative bg-zinc-950 text-white py-24 sm:py-32 overflow-hidden border-b border-zinc-800">
      
      {/* Editorial Grid Lines */}
      <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full w-full grid grid-cols-12 gap-8 border-x border-zinc-800/40 opacity-30">
          <div className="hidden lg:block col-span-5 border-r border-zinc-800/40" />
          <div className="hidden lg:block col-span-7" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="font-mono text-xs font-medium tracking-widest text-[#CF6A12] uppercase">
                Interactive System Simulator
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight-editorial text-white"
            >
              Experience the live interaction.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 text-sm sm:text-base text-zinc-400 font-sans max-w-xl"
            >
              Tap an activity below as the course PJ. Watch the live ledger update and student ranking recalculate in real-time.
            </motion.p>
          </div>

          {/* Tab Switcher & Reset */}
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-zinc-800 bg-zinc-900 p-1 font-mono text-xs">
              <button
                onClick={() => setActiveTab("pj-mobile")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === "pj-mobile"
                    ? "bg-[#CF6A12] text-white font-medium"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>PJ Input (Mobile)</span>
              </button>
              <button
                onClick={() => setActiveTab("student-desktop")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === "student-desktop"
                    ? "bg-[#CF6A12] text-white font-medium"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>Student Rapor (Desktop)</span>
              </button>
            </div>

            <button
              onClick={resetSandbox}
              title="Reset simulator values"
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
              aria-label="Reset sandbox"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Live Simulator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Simulated Panel (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl relative">
            
            {/* Header of Simulated App */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#CF6A12] font-serif font-bold text-white text-sm">
                  K
                </div>
                <div>
                  <div className="font-mono text-xs font-semibold text-zinc-200">
                    IF2204 • Struktur Data (Kelas 02)
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500">
                    Universitas Tidar • Ruang Kuliah T.04
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SSO Session Active</span>
              </div>
            </div>

            {/* Notification Toast if Awarded */}
            <AnimatePresence>
              {awardFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 flex items-center justify-between rounded-lg bg-emerald-900/80 border border-emerald-700 p-2.5 font-mono text-xs text-emerald-100"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    <span>{awardFeedback}</span>
                  </div>
                  <span className="text-[10px] text-emerald-300">Logged in 0.038s</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* View A: PJ Mobile Input */}
            {activeTab === "pj-mobile" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    1. Select Active Student in Class
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {students.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedStudentId(s.id)}
                        className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                          selectedStudentId === s.id
                            ? "border-[#CF6A12] bg-orange-950/30 ring-1 ring-[#CF6A12]"
                            : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700"
                        }`}
                      >
                        <div>
                          <div className="text-sm font-medium text-zinc-200">{s.name}</div>
                          <div className="font-mono text-[11px] text-zinc-500">NPM {s.npm}</div>
                        </div>
                        <div className="text-right font-mono">
                          <div className="text-sm font-semibold text-[#CF6A12]">{s.totalPoints} pts</div>
                          <div className="text-[10px] text-zinc-500">Rank #{students.findIndex((st) => st.id === s.id) + 1}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    2. Tap Point Category to Award
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      onClick={() => awardPoints("Pertanyaan (Tanya)", 1)}
                      className="group flex flex-col items-start p-3.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:border-[#CF6A12] hover:bg-orange-950/20 transition-all text-left"
                    >
                      <div className="flex items-center justify-between w-full font-mono mb-1">
                        <span className="text-xs text-zinc-400 group-hover:text-zinc-200">Pertanyaan</span>
                        <span className="text-xs font-bold text-[#CF6A12]">+1 pt</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-sans">
                        Mengajukan pertanyaan berbobot saat materi kuliah
                      </p>
                      <div className="mt-3 flex items-center gap-1 font-mono text-[10px] text-zinc-400">
                        <Plus className="h-3 w-3 text-[#CF6A12]" /> Tap to Award
                      </div>
                    </button>

                    <button
                      onClick={() => awardPoints("Jawaban Diskusi", 2)}
                      className="group flex flex-col items-start p-3.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:border-[#CF6A12] hover:bg-orange-950/20 transition-all text-left"
                    >
                      <div className="flex items-center justify-between w-full font-mono mb-1">
                        <span className="text-xs text-zinc-400 group-hover:text-zinc-200">Jawaban</span>
                        <span className="text-xs font-bold text-[#CF6A12]">+2 pts</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-sans">
                        Menjawab tantangan soal studi kasus dosen
                      </p>
                      <div className="mt-3 flex items-center gap-1 font-mono text-[10px] text-zinc-400">
                        <Plus className="h-3 w-3 text-[#CF6A12]" /> Tap to Award
                      </div>
                    </button>

                    <button
                      onClick={() => awardPoints("Presentasi Materi", 4)}
                      className="group flex flex-col items-start p-3.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:border-[#CF6A12] hover:bg-orange-950/20 transition-all text-left"
                    >
                      <div className="flex items-center justify-between w-full font-mono mb-1">
                        <span className="text-xs text-zinc-400 group-hover:text-zinc-200">Presentasi</span>
                        <span className="text-xs font-bold text-[#CF6A12]">+4 pts</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-sans">
                        Pemaparan hasil riset atau tugas kelompok
                      </p>
                      <div className="mt-3 flex items-center gap-1 font-mono text-[10px] text-zinc-400">
                        <Plus className="h-3 w-3 text-[#CF6A12]" /> Tap to Award
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View B: Student Desktop Rapor */}
            {activeTab === "student-desktop" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                    <div>
                      <div className="text-base font-semibold text-zinc-100">
                        {currentSelectedStudent.name}
                      </div>
                      <div className="font-mono text-xs text-zinc-500">
                        NPM: {currentSelectedStudent.npm} • Teknik Informatika UNTIDAR
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-2xl font-bold text-[#CF6A12]">
                        {currentSelectedStudent.totalPoints} pts
                      </div>
                      <div className="font-mono text-xs text-emerald-400 flex items-center justify-end gap-1">
                        <Award className="h-3.5 w-3.5" />
                        <span>Class Rank #{currentRank} of {students.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Breakdown */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between font-mono text-xs text-zinc-400 mb-1">
                        <span>Target Keaktifan Semester (40 pts)</span>
                        <span className="text-zinc-200">{Math.round((currentSelectedStudent.totalPoints / 40) * 100)}%</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#CF6A12] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (currentSelectedStudent.totalPoints / 40) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-xs text-center">
                      <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5">
                        <div className="text-base font-bold text-zinc-200">{currentSelectedStudent.questions}</div>
                        <div className="text-[11px] text-zinc-500">Pertanyaan (1pt)</div>
                      </div>
                      <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5">
                        <div className="text-base font-bold text-zinc-200">{currentSelectedStudent.answers}</div>
                        <div className="text-[11px] text-zinc-500">Jawaban (2pt)</div>
                      </div>
                      <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5">
                        <div className="text-base font-bold text-zinc-200">{currentSelectedStudent.presentations}</div>
                        <div className="text-[11px] text-zinc-500">Presentasi (4pt)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Live Audit Ledger (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Live Audit Log Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                <div className="flex items-center gap-2 text-zinc-300 font-semibold">
                  <History className="h-4 w-4 text-[#CF6A12]" />
                  <span>Real-Time Audit Ledger</span>
                </div>
                <span className="text-[10px] text-zinc-500 uppercase">Audit Snapshot</span>
              </div>

              <div className="space-y-2.5">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-lg border border-zinc-800/80 bg-zinc-950/70 p-2.5 flex items-start justify-between"
                  >
                    <div>
                      <div className="text-zinc-200 font-medium">{log.studentName}</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">
                        {log.category} • <span className="text-zinc-400">{log.reference}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-[#CF6A12]">+{log.points} pt</div>
                      <div className="text-[10px] text-zinc-500">{log.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic workflow note */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-300 mb-1 font-medium">
                <Sparkles className="h-3.5 w-3.5 text-[#CF6A12]" />
                <span>Academic Review Workflow</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                Activity records remain available for class and semester review. Any use in official grading remains subject to the lecturer and university&apos;s approved process.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
