import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200/80 text-zinc-600 font-sans py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-zinc-100">
          
          {/* Column 1: Brand & Tagline (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-medium tracking-tight text-zinc-950">
                karsa
              </span>
              <span className="font-mono text-[11px] tracking-widest text-[#CF6A12] uppercase">
                UNTIDAR
              </span>
            </div>

            <div className="space-y-1">
              <p className="font-serif text-lg text-zinc-800 italic">
                &ldquo;Every karsa, one point.&rdquo;
              </p>
              <p className="font-mono text-xs text-zinc-400">
                Setiap karsa, satu poin.
              </p>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              The purpose-built classroom participation ledger for Universitas Tidar. Designed to foster transparent active learning across engineering, economics, education, social sciences, and agriculture faculties.
            </p>
          </div>

          {/* Column 2: Links (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-900 font-semibold mb-4">
              Resources & Architecture
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600">
              <li>
                <a
                  href="https://karsa-one.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-zinc-950 transition-colors"
                >
                  <span>Student & PJ Login</span>
                  <ArrowUpRight className="h-3 w-3 text-zinc-400" />
                </a>
              </li>
              <li>
                <a
                  href="#workflow"
                  className="hover:text-zinc-950 transition-colors"
                >
                  System Architecture & Validation Flow
                </a>
              </li>
              <li>
                <a
                  href="#capabilities"
                  className="hover:text-zinc-950 transition-colors"
                >
                  Classroom Capabilities & Privacy
                </a>
              </li>
              <li>
                <a
                  href="#status"
                  className="hover:text-zinc-950 transition-colors"
                >
                  Fase 4C Roadmap & Changelog
                </a>
              </li>
              <li>
                <a
                  href="https://untidar.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-zinc-950 transition-colors"
                >
                  <span>Universitas Tidar Official Portal</span>
                  <ArrowUpRight className="h-3 w-3 text-zinc-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Stamp (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs text-zinc-500">
            <h4 className="uppercase tracking-wider text-zinc-900 font-semibold">
              Institution
            </h4>
            <div>
              <div className="font-medium text-zinc-800">Universitas Tidar</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Jl. Kapten Suparman No.39, Tuguran, Potrobangsan, Kec. Magelang Utara, Kota Magelang, Jawa Tengah 56116
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Staging Operational • Fase 4C</span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Privacy */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © 2026 Karsa. Universitas Tidar. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Academic Data Governance</span>
            <span>FERPA / GDPR Principles</span>
            <span>Zero Commercial Tracking</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
