import { LocalizedText } from "../i18n/LanguageContext";
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
                <h3 className="font-serif text-lg font-medium text-zinc-900"><LocalizedText>
                  Karsa Excel Recap Preview
                </LocalizedText></h3>
                <span className="rounded-full bg-zinc-200/80 px-2 py-0.5 font-mono text-[10px] text-zinc-700"><LocalizedText>
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
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-zinc-100 px-3 py-1.5 font-mono text-xs font-medium text-zinc-700"><LocalizedText>
              Rekap poin per mata kuliah
            </LocalizedText></div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Shield className="h-3.5 w-3.5 text-zinc-400" />
              <span><LocalizedText>Admin-only export</LocalizedText></span>
            </div>
          </div>

          {/* Spreadsheet table mock */}
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="bg-zinc-50 font-mono text-zinc-500 border-b border-zinc-200">
                  <th className="py-2.5 px-3 font-medium"><LocalizedText>Nama Mahasiswa</LocalizedText></th>
                  <th className="py-2.5 px-3 font-medium"><LocalizedText>NIM</LocalizedText></th>
                  <th className="py-2.5 px-3 font-medium text-center"><LocalizedText>Bahasa Indonesia</LocalizedText></th>
                  <th className="py-2.5 px-3 font-medium text-center"><LocalizedText>Statistik</LocalizedText></th>
                  <th className="py-2.5 px-3 font-medium text-center"><LocalizedText>Perpajakan</LocalizedText></th>
                  <th className="py-2.5 px-3 font-medium text-right text-zinc-900"><LocalizedText>Total Poin</LocalizedText></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans">
                {sampleRows.map((row) => (
                  <tr key={row.nim} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-zinc-900"><LocalizedText>{row.name}</LocalizedText></td>
                    <td className="py-2.5 px-3 font-mono text-zinc-600"><LocalizedText>{row.nim}</LocalizedText></td>
                    <td className="py-2.5 px-3 text-center font-mono text-zinc-600"><LocalizedText>{row.bahasa}</LocalizedText></td>
                    <td className="py-2.5 px-3 text-center font-mono text-zinc-600"><LocalizedText>{row.statistik}</LocalizedText></td>
                    <td className="py-2.5 px-3 text-center font-mono text-zinc-600"><LocalizedText>{row.pajak}</LocalizedText></td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-zinc-900">
                      <LocalizedText>{row.total}</LocalizedText>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-500 font-mono">
            <span><LocalizedText>Layout preview only — export asli dibuat dari kelas yang dipilih admin.</LocalizedText></span>
            <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-zinc-600"><LocalizedText>Nama · NIM · Matkul · Total</LocalizedText></span>
          </div>
        </div>
      </div>
    </div>
  );
}
