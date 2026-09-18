import { useState } from "react";
import { X, FileSpreadsheet, Download, Check, Shield } from "lucide-react";

interface ExportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportPreviewModal({ isOpen, onClose }: ExportPreviewModalProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "session">("summary");

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const sampleRows = [
    { npm: "2210501001", name: "Aditya Pratama Nugraha", q: 8, a: 6, p: 4, total: 36, grade: "A (10%)" },
    { npm: "2210501002", name: "Bima Arya Wicaksono", q: 5, a: 4, p: 2, total: 24, grade: "A (10%)" },
    { npm: "2210501003", name: "Citra Dewi Lestari", q: 6, a: 5, p: 3, total: 29, grade: "A (10%)" },
    { npm: "2210501004", name: "Dimas Suryo Prasetyo", q: 3, a: 2, p: 1, total: 14, grade: "B+ (8.5%)" },
    { npm: "2210501005", name: "Eka Putri Rahmawati", q: 7, a: 4, p: 2, total: 28, grade: "A (10%)" },
    { npm: "2210501006", name: "Fajar Hidayatullah", q: 4, a: 3, p: 0, total: 15, grade: "B+ (8.5%)" },
    { npm: "2210501007", name: "Gita Maharani", q: 6, a: 7, p: 4, total: 38, grade: "A (10%)" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-white border border-zinc-200 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-medium text-zinc-900">
                  UNTIDAR SIAKAD Export Preview
                </h3>
                <span className="rounded-full bg-zinc-200/80 px-2 py-0.5 font-mono text-[10px] text-zinc-700">
                  .xlsx format
                </span>
              </div>
              <p className="font-mono text-xs text-zinc-500">
                IF2204 • Struktur Data (Kelas 02) • Semester Genap 2025/2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1 font-mono text-xs">
              <button
                onClick={() => setActiveTab("summary")}
                className={`rounded-md px-3 py-1 transition-colors ${
                  activeTab === "summary"
                    ? "bg-white text-zinc-900 shadow-xs font-medium"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Semester Summary
              </button>
              <button
                onClick={() => setActiveTab("session")}
                className={`rounded-md px-3 py-1 transition-colors ${
                  activeTab === "session"
                    ? "bg-white text-zinc-900 shadow-xs font-medium"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Session Breakdown (1-14)
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Shield className="h-3.5 w-3.5 text-zinc-400" />
              <span>Verified PJ Signature: 0x8F9...C2</span>
            </div>
          </div>

          {/* Spreadsheet table mock */}
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="bg-zinc-50 font-mono text-zinc-500 border-b border-zinc-200">
                  <th className="py-2.5 px-3 font-medium">NPM</th>
                  <th className="py-2.5 px-3 font-medium">Nama Mahasiswa</th>
                  <th className="py-2.5 px-3 font-medium text-center">Tanya (1pt)</th>
                  <th className="py-2.5 px-3 font-medium text-center">Jawab (2pt)</th>
                  <th className="py-2.5 px-3 font-medium text-center">Presentasi (4pt)</th>
                  <th className="py-2.5 px-3 font-medium text-right text-zinc-900">Total Poin</th>
                  <th className="py-2.5 px-3 font-medium text-right text-[#CF6A12]">Konversi SIAKAD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans">
                {sampleRows.map((row) => (
                  <tr key={row.npm} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-zinc-600">{row.npm}</td>
                    <td className="py-2.5 px-3 font-medium text-zinc-900">{row.name}</td>
                    <td className="py-2.5 px-3 text-center font-mono text-zinc-600">{row.q}</td>
                    <td className="py-2.5 px-3 text-center font-mono text-zinc-600">{row.a}</td>
                    <td className="py-2.5 px-3 text-center font-mono text-zinc-600">{row.p}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-zinc-900">
                      {row.total}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-[#CF6A12]">
                      {row.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-500 font-mono">
            <span>Formula standard: Keaktifan = (Poin Mahasiswa / Max Poin Kelas) × 100%</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 font-sans text-xs font-medium text-white hover:bg-zinc-800 transition-colors"
              >
                {downloaded ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>File exported (Sample)</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    <span>Download sample .xlsx</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
