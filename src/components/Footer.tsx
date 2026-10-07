import { LocalizedText } from "../i18n/LanguageContext";
import { Link } from "react-router-dom";
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
              <span className="font-serif text-3xl font-medium tracking-tight text-zinc-950"><LocalizedText>
                karsa
              </LocalizedText></span>
              <span className="font-mono text-[11px] tracking-widest text-[#CF6A12] uppercase"><LocalizedText>
                UNTIDAR
              </LocalizedText></span>
            </div>

            <div className="space-y-1">
              <p className="font-serif text-lg text-zinc-800 italic"><LocalizedText>
                &ldquo;Every karsa, one point.&rdquo;
              </LocalizedText></p>
              <p className="font-mono text-xs text-zinc-400"><LocalizedText>
                Setiap karsa, satu poin.
              </LocalizedText></p>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm"><LocalizedText>
              The purpose-built classroom participation ledger for Universitas Tidar. Designed to foster transparent active learning across engineering, economics, education, social sciences, and agriculture faculties.
            </LocalizedText></p>
          </div>

          {/* Column 2: Links (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-900 font-semibold mb-4"><LocalizedText>
              Resources & Architecture
            </LocalizedText></h4>
            <ul className="space-y-2.5 text-xs text-zinc-600">
              <li>
                <button type="button" disabled className="inline-flex cursor-not-allowed items-center gap-1 text-zinc-400"><LocalizedText>
                  Download Karsa Mobile </LocalizedText>
                </button>
              </li>
              <li>
                <a
                  href="https://www.sikarsa.id/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-zinc-950 transition-colors"
                >
                  <span><LocalizedText>Student & PJ Login</LocalizedText></span>
                  <ArrowUpRight className="h-3 w-3 text-zinc-400" />
                </a>
              </li>
              <li>
                <a
                  href="#workflow"
                  className="hover:text-zinc-950 transition-colors"
                ><LocalizedText>
                  System Architecture & Validation Flow
                </LocalizedText></a>
              </li>
              <li>
                <a
                  href="#capabilities"
                  className="hover:text-zinc-950 transition-colors"
                ><LocalizedText>
                  Classroom Capabilities & Privacy
                </LocalizedText></a>
              </li>
              <li>
                <a
                  href="#status"
                  className="hover:text-zinc-950 transition-colors"
                ><LocalizedText>
                  Fase 5 Roadmap & Changelog
                </LocalizedText></a>
              </li>
              <li>
                <a
                  href="https://untidar.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-zinc-950 transition-colors"
                >
                  <span><LocalizedText>Universitas Tidar Official Portal</LocalizedText></span>
                  <ArrowUpRight className="h-3 w-3 text-zinc-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Stamp (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs text-zinc-500">
            <h4 className="uppercase tracking-wider text-zinc-900 font-semibold"><LocalizedText>
              Academic Context
            </LocalizedText></h4>
            <div>
              <div className="font-medium text-zinc-800"><LocalizedText>Universitas Tidar</LocalizedText></div>
              <div className="text-[11px] text-zinc-500 mt-0.5"><LocalizedText>
                Designed independently for classroom participation workflows in the UNTIDAR environment. Not yet an official university service.
              </LocalizedText></div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span><LocalizedText>Independent Pilot • Fase 5</LocalizedText></span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Privacy */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div><LocalizedText>
            © 2026 Karsa. Independent project for the UNTIDAR environment.
          </LocalizedText></div>
          <Link
            to="/privacy"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1 text-zinc-600 hover:text-[#CF6A12] hover:border-[#CF6A12] transition-colors"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span><LocalizedText>Privasi & Keamanan</LocalizedText></span>
          </Link>
        </div>

      </div>
    </footer>
  );
}
