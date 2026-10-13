import { LanguageToggle } from "./LanguageToggle";
import { LocalizedText, useLanguage } from "../i18n/LanguageContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-5">
      <div
        className={`mx-auto max-w-7xl transition-all duration-300 ${
          scrolled ? "mt-2 sm:mt-3" : "mt-3 sm:mt-4"
        }`}
      >
        <div
          className={`rounded-2xl border transition-all duration-300 ${
            scrolled
              ? "border-white/10 bg-[#0A0A0A]/88 shadow-[0_18px_44px_-16px_rgba(10,10,10,0.55)] backdrop-blur-xl"
              : "border-white/[0.07] bg-[#0A0A0A]/60 backdrop-blur-md"
          }`}
        >
          <div className="flex h-14 items-center justify-between px-3 sm:px-4">
            {/* Logo / Brand */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="flex items-baseline gap-2 group transition-opacity hover:opacity-80"
              >
                <span className="font-serif text-2xl font-medium tracking-tight text-white"><LocalizedText>
                  karsa
                </LocalizedText></span>
              </a>

              <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-mono text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" />
                <span><LocalizedText>Independent Pilot • Fase 5</LocalizedText></span>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <nav className="hidden xl:flex items-center gap-5 text-xs font-medium text-zinc-300">
              <a
                href="#problem"
                className="transition-colors hover:text-white"
              ><LocalizedText>
                Problem
              </LocalizedText></a>
              <a
                href="#idea"
                className="transition-colors hover:text-white"
              ><LocalizedText>
                The Idea
              </LocalizedText></a>
              <a
                href="#workflow"
                className="transition-colors hover:text-white"
              ><LocalizedText>
                Workflow
              </LocalizedText></a>
              <a
                href="#capabilities"
                className="transition-colors hover:text-white"
              ><LocalizedText>
                Capabilities
              </LocalizedText></a>
              <a
                href="#security"
                className="transition-colors hover:text-white"
              ><LocalizedText>
                Security
              </LocalizedText></a>
              <a
                href="#status"
                className="transition-colors hover:text-white"
              ><LocalizedText>
                Status
              </LocalizedText></a>
              <button type="button" disabled className="cursor-not-allowed text-zinc-500"><LocalizedText>
                Download app
              </LocalizedText></button>
            </nav>

            {/* Action CTAs */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="rounded-lg bg-white/[0.92]">
                <LanguageToggle />
              </div>
              <Link
                to="/paket"
                className="hidden sm:inline-flex items-center rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-100 transition-colors hover:bg-white/10 hover:border-white/25 active:scale-[0.99]"
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
                className="p-2 text-zinc-300 hover:text-white xl:hidden"
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
            <div className="xl:hidden border-t border-white/[0.07] py-3 px-2 space-y-1">
              <a
                href="#problem"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/[0.06]"
              ><LocalizedText>
                The Problem
              </LocalizedText></a>
              <a
                href="#idea"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/[0.06]"
              ><LocalizedText>
                The Idea
              </LocalizedText></a>
              <a
                href="#workflow"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/[0.06]"
              ><LocalizedText>
                How It Works
              </LocalizedText></a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/[0.06]"
              ><LocalizedText>
                Capabilities
              </LocalizedText></a>
              <a
                href="#security"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/[0.06]"
              ><LocalizedText>
                Security
              </LocalizedText></a>
              <a
                href="#status"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/[0.06]"
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
              <div className="pt-2 mt-1 border-t border-white/[0.07] flex flex-col gap-1">
                <Link
                  to="/paket"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-left rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/[0.06]"
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
