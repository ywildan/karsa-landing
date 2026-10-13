import { LocalizedText } from "../i18n/LanguageContext";
import { motion } from "framer-motion";
import { X, FileSpreadsheet, Shield } from "lucide-react";

interface ExportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportPreviewModal({ isOpen, onClose }: ExportPreviewModalProps) {
  if (!isOpen) return null;

  const sampleRows = [
    { nim: "2210501001", name: "Aditya Pratama Nugraha", bahasa: 12, statistik: 8, pajak: 7, total: 27 },
    { nim: "2210501002", name: "Bima Arya Wicaksono", bahasa: 9, statistik: 6, pajak: 8, total: 23 },
    { nim: "2210501003", name: "Citra Dewi Lestari", bahasa: 14, statistik: 10, pajak: 5, total: 29 },
    { nim: "2210501004", name: "Dimas Suryo Prasetyo", bahasa: 6, statistik: 7, pajak: 4, total: 17 },
    { nim: "2210501005", name: "Eka Putri Rahmawati", bahasa: 11, statistik: 9, pajak: 6, total: 26 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 perspective-1200 sm:p-6">
      <div
        className="fixed inset-0 bg-[#0A0A0A]/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div aria-hidden="true" className="dot-grid-dark pointer-events-none fixed inset-0 opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="depth-lg preserve-3d relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-zinc-200/80 bg-white"
      >
        {/* Orange top accent */}
        <div aria-hidden="true" className="h-1 w-full bg-gradient-to-r from-[#CF6A12] via-[#CF6A12]/70 to-transparent" />
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 bg-[#FBF4EE]/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="depth-sm flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-serif text-lg font-medium text-zinc-900 sm:text-xl"><LocalizedText>
                  Karsa Excel Recap Preview
                </LocalizedText></h3>
                <span className="rounded-full bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-white"><LocalizedText>
                  .xlsx format
                </LocalizedText></span>
              </div>
              <p className="font-mono text-xs text-zinc-500"><LocalizedText>
                Kelas K1 • Akuntansi Perpajakan • Semester Ganjil 2026/2027
              </LocalizedText></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white hover:text-[#CF6A12]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="depth-sm rounded-xl bg-zinc-900 px-3 py-1.5 font-mono text-xs font-medium text-white"><LocalizedText>
              Rekap poin per mata kuliah
            </LocalizedText></div>

            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
              <Shield className="h-3.5 w-3.5 text-emerald-600" />
              <span><LocalizedText>Admin-only export</LocalizedText></span>
            </div>
          </div>

          {/* Spreadsheet table mock */}
          <div className="depth-sm overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 font-mono text-zinc-500">
                  <th className="px-3 py-3 font-medium"><LocalizedText>Nama Mahasiswa</LocalizedText></th>
                  <th className="px-3 py-3 font-medium"><LocalizedText>NIM</LocalizedText></th>
                  <th className="px-3 py-3 text-center font-medium"><LocalizedText>Bahasa Indonesia</LocalizedText></th>
                  <th className="px-3 py-3 text-center font-medium"><LocalizedText>Statistik</LocalizedText></th>
                  <th className="px-3 py-3 text-center font-medium"><LocalizedText>Perpajakan</LocalizedText></th>
                  <th className="px-3 py-3 text-right font-medium text-[#CF6A12]"><LocalizedText>Total Poin</LocalizedText></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans">
                {sampleRows.map((row) => (
                  <tr key={row.nim} className="transition-colors hover:bg-[#FBF4EE]/70">
                    <td className="px-3 py-3 font-medium text-zinc-900"><LocalizedText>{row.name}</LocalizedText></td>
                    <td className="px-3 py-3 font-mono text-zinc-600"><LocalizedText>{row.nim}</LocalizedText></td>
                    <td className="px-3 py-3 text-center font-mono text-zinc-600"><LocalizedText>{row.bahasa}</LocalizedText></td>
                    <td className="px-3 py-3 text-center font-mono text-zinc-600"><LocalizedText>{row.statistik}</LocalizedText></td>
                    <td className="px-3 py-3 text-center font-mono text-zinc-600"><LocalizedText>{row.pajak}</LocalizedText></td>
                    <td className="px-3 py-3 text-right font-mono font-semibold text-zinc-900">
                      <LocalizedText>{row.total}</LocalizedText>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-3 font-mono text-xs text-zinc-500 sm:flex-row sm:items-center">
            <span><LocalizedText>Layout preview only — export asli dibuat dari kelas yang dipilih admin.</LocalizedText></span>
            <span className="depth-sm w-fit rounded-lg bg-[#FBF4EE] px-2.5 py-1 text-[#CF6A12]"><LocalizedText>Nama · NIM · Matkul · Total</LocalizedText></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
