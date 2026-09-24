import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, ArrowRight, Mail, User, BookOpen } from "lucide-react";

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestAccessModal({ isOpen, onClose }: RequestAccessModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "dosen", // dosen, pj, admin
    faculty: "Fakultas Teknik",
    course: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_1wcs92m",
          template_id: "template_hh0nz7r",
          user_id: "lRgEONaUTgn1AyioL",
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            role: formData.role,
            faculty: formData.faculty,
            course: formData.course,
            submission_time: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`EmailJS responded with status ${response.status}`);
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      role: "dosen",
      faculty: "Fakultas Teknik",
      course: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={resetForm}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white border border-zinc-200 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#CF6A12]" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              Pilot Access / 2026 Academic Year
            </span>
          </div>
          <button
            onClick={resetForm}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {!submitted ? (
            <div>
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-normal text-zinc-900 tracking-tight">
                  Request Pilot Access for UNTIDAR
                </h3>
                <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">
                  Early staging builds are accessible for Universitas Tidar course instructors (Dosen) and Penanggung Jawab (PJ) coordinators.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 mb-1.5">
                    Full Name & Title
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dr. Hendra Pratama, S.T., M.Eng."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#CF6A12] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CF6A12]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 mb-1.5">
                    UNTIDAR Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <input
                      required
                      type="email"
                      placeholder="user@untidar.ac.id or @students.untidar.ac.id"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#CF6A12] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CF6A12]"
                    />
                  </div>
                  <p className="mt-1 text-[11px] font-mono text-zinc-400">
                    Must belong to UNTIDAR Google Workspace domain.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 mb-1.5">
                      Role / Capacity
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 py-2 px-3 text-sm text-zinc-900 focus:border-[#CF6A12] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CF6A12]"
                    >
                      <option value="dosen">Dosen Pengampu</option>
                      <option value="pj">PJ Kelas (Penanggung Jawab)</option>
                      <option value="kaprodi">Koordinator / Kaprodi</option>
                      <option value="evaluator">Tim Akademik UNTIDAR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 mb-1.5">
                      Faculty (Fakultas)
                    </label>
                    <div className="relative">
                      <select
                        value={formData.faculty}
                        onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 py-2 px-3 text-sm text-zinc-900 focus:border-[#CF6A12] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CF6A12]"
                      >
                        <option value="Fakultas Teknik">Fakultas Teknik (FT)</option>
                        <option value="Fakultas Ekonomi">Fakultas Ekonomi (FE)</option>
                        <option value="FKIP">FKIP</option>
                        <option value="Fisipol">FISIPOL</option>
                        <option value="Faperta">FAPERTA</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 mb-1.5">
                    Target Course & Class (Mata Kuliah)
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="e.g. Struktur Data (Kelas 01) or Algoritma"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#CF6A12] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CF6A12]"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
                    <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
                    Sent over HTTPS
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      disabled={isSubmitting}
                      className="rounded-lg px-3.5 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#CF6A12] px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-[#B85B0D] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit request</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {submitError && (
                  <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 font-mono">
                    <span className="font-semibold">Error:</span> {submitError}
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[#CF6A12] ring-8 ring-orange-50/50">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-2xl text-zinc-900 tracking-tight">
                Pilot request recorded
              </h4>
              <p className="mt-2 text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-zinc-800">{formData.name || "Colleague"}</strong>. The UNTIDAR academic coordination team will provision your test credentials within one business day.
              </p>

              <div className="mt-6 rounded-lg bg-zinc-50 p-3 text-left border border-zinc-200/70 font-mono text-xs text-zinc-600">
                <div className="text-zinc-400 text-[10px] uppercase tracking-wider mb-1">Assigned Verification Queue</div>
                <div className="text-zinc-800 font-medium">UNTIDAR-PILOT-2026-F4C</div>
                <div className="text-zinc-500 text-[11px] mt-1">{formData.email || "demo@students.untidar.ac.id"} • {formData.faculty}</div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={resetForm}
                  className="rounded-lg bg-zinc-900 px-5 py-2 text-xs font-medium text-white hover:bg-zinc-800 transition-colors"
                >
                  Return to landing page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
