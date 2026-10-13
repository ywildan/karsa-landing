import { LanguageToggle } from "./LanguageToggle";
import { LocalizedText, useLanguage } from "../i18n/LanguageContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { isFastScrolling } from "./fx/fastScroll";

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Adapt the pill to the section behind it: sections declare
  // data-nav-theme="dark" | "light"; probe the point just below the pill.
  useEffect(() => {
    let raf = 0;
    const detect = () => {
      raf = 0;
      if (isFastScrolling()) return; // keep the settled theme mid-fling; no strobing
      const el = document.elementFromPoint(Math.floor(window.innerWidth / 2), 92);
      const host = el instanceof Element ? el.closest("[data-nav-theme]") : null;
      const next = host?.getAttribute("data-nav-theme");
      if (next === "dark" || next === "light") setTheme(next);
    };
    let settle = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(detect);
      window.clearTimeout(settle);
      settle = window.setTimeout(detect, 200);
    };
    detect();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-5">
      <div
        className={`mx-auto max-w-7xl transition-all duration-300 ${
          scrolled ? "mt-2 sm:mt-3" : "mt-3 sm:mt-4"
        }`}
      >
        <div
          className={`rounded-2xl border transition-all duration-300 ${
            theme === "dark"
              ? scrolled
                ? "border-white/10 bg-[linear-gradient(120deg,rgba(12,10,9,0.90),rgba(43,26,13,0.86)_58%,rgba(84,45,15,0.82))] shadow-[0_18px_44px_-16px_rgba(10,10,10,0.55)] backdrop-blur-xl"
                : "border-white/[0.07] bg-[linear-gradient(120deg,rgba(12,10,9,0.66),rgba(43,26,13,0.60)_58%,rgba(84,45,15,0.55))] backdrop-blur-md"
              : scrolled
                ? "border-zinc-900/[0.08] bg-[linear-gradient(120deg,rgba(255,255,255,0.85),rgba(251,244,238,0.80)_58%,rgba(243,226,205,0.78))] shadow-[0_18px_44px_-16px_rgba(10,10,10,0.28)] backdrop-blur-xl"
                : "border-zinc-900/[0.06] bg-[linear-gradient(120deg,rgba(255,255,255,0.68),rgba(251,244,238,0.62)_58%,rgba(243,226,205,0.58))] backdrop-blur-md"
          }`}
        >
          <div className="flex h-14 items-center justify-between px-3 sm:px-4">
            {/* Logo / Brand */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="flex items-baseline gap-2 group transition-opacity hover:opacity-80"
              >
                <span className={`font-serif text-2xl font-medium tracking-tight transition-colors ${theme === "dark" ? "text-white" : "text-zinc-950"}`}><LocalizedText>
                  karsa
                </LocalizedText></span>
              </a>

              <div className={`hidden lg:flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-mono transition-colors ${theme === "dark" ? "border-white/10 bg-white/[0.06] text-zinc-300" : "border-zinc-900/10 bg-zinc-900/[0.04] text-zinc-600"}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" />
                <span><LocalizedText>Independent Pilot • Fase 5</LocalizedText></span>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <nav className={`hidden xl:flex items-center gap-5 text-xs font-medium transition-colors ${theme === "dark" ? "text-zinc-300" : "text-zinc-600"}`}>
              <a
                href="#problem"
                className={`group relative py-1 transition-colors duration-200 ${theme === "dark" ? "hover:text-white" : "hover:text-zinc-950"}`}
              ><LocalizedText>
                Problem
              </LocalizedText><span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#CF6A12] transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
              <a
                href="#idea"
                className={`group relative py-1 transition-colors duration-200 ${theme === "dark" ? "hover:text-white" : "hover:text-zinc-950"}`}
              ><LocalizedText>
                The Idea
              </LocalizedText><span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#CF6A12] transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
              <a
                href="#workflow"
                className={`group relative py-1 transition-colors duration-200 ${theme === "dark" ? "hover:text-white" : "hover:text-zinc-950"}`}
              ><LocalizedText>
                Workflow
              </LocalizedText><span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#CF6A12] transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
              <a
                href="#capabilities"
                className={`group relative py-1 transition-colors duration-200 ${theme === "dark" ? "hover:text-white" : "hover:text-zinc-950"}`}
              ><LocalizedText>
                Capabilities
              </LocalizedText><span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#CF6A12] transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
              <a
                href="#security"
                className={`group relative py-1 transition-colors duration-200 ${theme === "dark" ? "hover:text-white" : "hover:text-zinc-950"}`}
              ><LocalizedText>
                Security
              </LocalizedText><span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#CF6A12] transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
              <a
                href="#status"
                className={`group relative py-1 transition-colors duration-200 ${theme === "dark" ? "hover:text-white" : "hover:text-zinc-950"}`}
              ><LocalizedText>
                Status
              </LocalizedText><span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#CF6A12] transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
              <button type="button" disabled className={`cursor-not-allowed py-1 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}><LocalizedText>
                Download app
              </LocalizedText></button>
            </nav>

            {/* Action CTAs */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <LanguageToggle variant={theme} />
              <Link
                to="/paket"
                className={`hidden sm:inline-flex items-center rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors active:scale-[0.99] ${theme === "dark" ? "border-white/15 bg-white/[0.04] text-zinc-100 hover:bg-white/10 hover:border-white/25" : "border-zinc-900/10 bg-zinc-900/[0.03] text-zinc-800 hover:bg-zinc-900/[0.06] hover:border-zinc-900/20"}`}
              ><LocalizedText>
                Paket
              </LocalizedText></Link>

              <a
                href="https://www.sikarsa.id/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-[#CF6A12] px-3.5 py-2 text-xs font-medium text-white transition-all hover:bg-[#B85B0D] active:scale-[0.99]"
              >
                <span><LocalizedText>Sign in</LocalizedText></span>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/70" />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 xl:hidden transition-colors ${theme === "dark" ? "text-zinc-300 hover:text-white" : "text-zinc-600 hover:text-zinc-950"}`}
                aria-label={t("Toggle navigation menu")}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className={`xl:hidden border-t py-3 px-2 space-y-1 ${theme === "dark" ? "border-white/[0.07]" : "border-zinc-900/[0.08]"}`}>
              <a
                href="#problem"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm ${theme === "dark" ? "text-zinc-200 hover:bg-white/[0.06]" : "text-zinc-700 hover:bg-zinc-900/[0.05]"}`}
              ><LocalizedText>
                The Problem
              </LocalizedText></a>
              <a
                href="#idea"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm ${theme === "dark" ? "text-zinc-200 hover:bg-white/[0.06]" : "text-zinc-700 hover:bg-zinc-900/[0.05]"}`}
              ><LocalizedText>
                The Idea
              </LocalizedText></a>
              <a
                href="#workflow"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm ${theme === "dark" ? "text-zinc-200 hover:bg-white/[0.06]" : "text-zinc-700 hover:bg-zinc-900/[0.05]"}`}
              ><LocalizedText>
                How It Works
              </LocalizedText></a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm ${theme === "dark" ? "text-zinc-200 hover:bg-white/[0.06]" : "text-zinc-700 hover:bg-zinc-900/[0.05]"}`}
              ><LocalizedText>
                Capabilities
              </LocalizedText></a>
              <a
                href="#security"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm ${theme === "dark" ? "text-zinc-200 hover:bg-white/[0.06]" : "text-zinc-700 hover:bg-zinc-900/[0.05]"}`}
              ><LocalizedText>
                Security
              </LocalizedText></a>
              <a
                href="#status"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm ${theme === "dark" ? "text-zinc-200 hover:bg-white/[0.06]" : "text-zinc-700 hover:bg-zinc-900/[0.05]"}`}
              ><LocalizedText>
                Development Status
              </LocalizedText></a>
              <button
                type="button"
                disabled
                className="block w-full cursor-not-allowed rounded-md px-3 py-2 text-left text-sm text-zinc-500"
              ><LocalizedText>
                Download Karsa Mobile
              </LocalizedText></button>
              <div className={`pt-2 mt-1 border-t flex flex-col gap-1 ${theme === "dark" ? "border-white/[0.07]" : "border-zinc-900/[0.08]"}`}>
                <Link
                  to="/paket"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full text-left rounded-md px-3 py-2 text-sm ${theme === "dark" ? "text-zinc-200 hover:bg-white/[0.06]" : "text-zinc-700 hover:bg-zinc-900/[0.05]"}`}
                ><LocalizedText>
                  Paket
                </LocalizedText></Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
