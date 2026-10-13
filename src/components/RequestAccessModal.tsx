import { LocalizedText, useLanguage } from "../i18n/LanguageContext";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, ArrowRight, Mail, User, BookOpen } from "lucide-react";

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestAccessModal({ isOpen, onClose }: RequestAccessModalProps) {
  const { t } = useLanguage();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 perspective-1200 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A0A0A]/70 backdrop-blur-md transition-opacity"
        onClick={resetForm}
      />
      <div aria-hidden="true" className="dot-grid-dark pointer-events-none fixed inset-0 opacity-40" />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="depth-lg preserve-3d relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200/80 bg-white"
      >
        {/* Orange top accent */}
        <div aria-hidden="true" className="h-1 w-full bg-gradient-to-r from-[#CF6A12] via-[#CF6A12]/70 to-transparent" />
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#CF6A12]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500"><LocalizedText>
              Pilot Access / 2026 Academic Year
            </LocalizedText></span>
          </div>
          <button
            onClick={resetForm}
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-[#FBF4EE] hover:text-[#CF6A12]"
            aria-label={t("Close modal")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 sm:p-7">
          {!submitted ? (
            <div>
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-normal tracking-tight text-zinc-900 sm:text-[28px]"><LocalizedText>
                  Request Pilot Access for UNTIDAR
                </LocalizedText></h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500"><LocalizedText>
                  Early staging builds are accessible for Universitas Tidar course instructors (Dosen) and Penanggung Jawab (PJ) coordinators.
                </LocalizedText></p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-600"><LocalizedText>
                    Full Name & Title
                  </LocalizedText></label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <input
                      required
                      type="text"
                      placeholder={t("e.g. Dr. Hendra Pratama, S.T., M.Eng.")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 py-2.5 pl-9 pr-3 text-sm text-zinc-900 shadow-inner transition-colors placeholder:text-zinc-400 focus:border-[#CF6A12] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CF6A12]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-600"><LocalizedText>
                    UNTIDAR Email Address
                  </LocalizedText></label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <input
                      required
                      type="email"
                      placeholder={t("user@untidar.ac.id or @students.untidar.ac.id")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 py-2.5 pl-9 pr-3 text-sm text-zinc-900 shadow-inner transition-colors placeholder:text-zinc-400 focus:border-[#CF6A12] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CF6A12]/30"
                    />
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-zinc-400"><LocalizedText>
                    Must belong to UNTIDAR Google Workspace domain.
                  </LocalizedText></p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-600"><LocalizedText>
                      Role / Capacity
                    </LocalizedText></label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 px-3 py-2.5 text-sm text-zinc-900 shadow-inner transition-colors focus:border-[#CF6A12] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CF6A12]/30"
                    >
                      <option value="dosen"><LocalizedText>Dosen Pengampu</LocalizedText></option>
                      <option value="pj"><LocalizedText>PJ Kelas (Penanggung Jawab)</LocalizedText></option>
                      <option value="kaprodi"><LocalizedText>Koordinator / Kaprodi</LocalizedText></option>
                      <option value="evaluator"><LocalizedText>Tim Akademik UNTIDAR</LocalizedText></option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-600"><LocalizedText>
                      Faculty (Fakultas)
                    </LocalizedText></label>
                    <div className="relative">
                      <select
                        value={formData.faculty}
                        onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 px-3 py-2.5 text-sm text-zinc-900 shadow-inner transition-colors focus:border-[#CF6A12] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CF6A12]/30"
                      >
                        <option value="Fakultas Teknik"><LocalizedText>Fakultas Teknik (FT)</LocalizedText></option>
                        <option value="Fakultas Ekonomi"><LocalizedText>Fakultas Ekonomi (FE)</LocalizedText></option>
                        <option value="FKIP"><LocalizedText>FKIP</LocalizedText></option>
                        <option value="Fisipol"><LocalizedText>FISIPOL</LocalizedText></option>
                        <option value="Faperta"><LocalizedText>FAPERTA</LocalizedText></option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-600"><LocalizedText>
                    Target Course & Class (Mata Kuliah)
                  </LocalizedText></label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      placeholder={t("e.g. Struktur Data (Kelas 01) or Algoritma")}
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 py-2.5 pl-9 pr-3 text-sm text-zinc-900 shadow-inner transition-colors placeholder:text-zinc-400 focus:border-[#CF6A12] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CF6A12]/30"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-2">
                  <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /><LocalizedText>
                    Sent over HTTPS
                  </LocalizedText></span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      disabled={isSubmitting}
                      className="rounded-xl px-3.5 py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 disabled:opacity-50"
                    ><LocalizedText>
                      Cancel
                    </LocalizedText></button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="depth-sm inline-flex items-center gap-1.5 rounded-xl bg-[#CF6A12] px-4 py-2 text-xs font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#B85B0D] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span><LocalizedText>Sending...</LocalizedText></span>
                        </>
                      ) : (
                        <>
                          <span><LocalizedText>Submit request</LocalizedText></span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {submitError && (
                  <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 font-mono text-xs text-rose-700">
                    <span className="font-semibold"><LocalizedText>Error:</LocalizedText></span> <LocalizedText>{submitError}</LocalizedText>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className="py-6 text-center">
              <div className="depth-sm mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBF4EE] text-[#CF6A12] ring-8 ring-[#FBF4EE]/60">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h4 className="font-serif text-2xl tracking-tight text-zinc-900"><LocalizedText>
                Pilot request recorded
              </LocalizedText></h4>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-zinc-500"><LocalizedText>
                Thank you, </LocalizedText><strong className="text-zinc-800"><LocalizedText>{formData.name || "Colleague"}</LocalizedText></strong><LocalizedText>. The UNTIDAR academic coordination team will provision your test credentials within one business day.
              </LocalizedText></p>

              <div className="depth-sm mt-6 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 text-left font-mono text-xs text-zinc-600">
                <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-zinc-400"><LocalizedText>Assigned Verification Queue</LocalizedText></div>
                <div className="font-medium text-zinc-800"><LocalizedText>UNTIDAR-PILOT-2026-F4C</LocalizedText></div>
                <div className="mt-1 text-[11px] text-zinc-500"><LocalizedText>{formData.email || "demo@students.untidar.ac.id"}</LocalizedText> • <LocalizedText>{formData.faculty}</LocalizedText></div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={resetForm}
                  className="depth-sm rounded-xl bg-[#0A0A0A] px-5 py-2.5 text-xs font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800"
                ><LocalizedText>
                  Return to landing page
                </LocalizedText></button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
