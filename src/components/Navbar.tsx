import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onRequestAccess: () => void;
}

export function Navbar({ onRequestAccess }: NavbarProps) {
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-zinc-200/80 shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-baseline gap-2 group transition-opacity hover:opacity-80"
            >
              <span className="font-serif text-2xl font-medium tracking-tight text-zinc-950">
                karsa
              </span>
              <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase hidden sm:inline">
                UNTIDAR
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-0.5 text-[11px] font-mono text-zinc-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" />
              <span>Fase 5 • 2026/2027</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-600">
            <a
              href="#problem"
              className="transition-colors hover:text-zinc-950"
            >
              Problem
            </a>
            <a
              href="#idea"
              className="transition-colors hover:text-zinc-950"
            >
              The Idea
            </a>
            <a
              href="#workflow"
              className="transition-colors hover:text-zinc-950"
            >
              Workflow
            </a>
            <a
              href="#capabilities"
              className="transition-colors hover:text-zinc-950"
            >
              Capabilities
            </a>
            <a
              href="#status"
              className="transition-colors hover:text-zinc-950"
            >
              Status
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRequestAccess}
              className="hidden sm:inline-flex items-center rounded-lg border border-zinc-200 bg-white/50 px-3.5 py-1.5 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100 hover:border-zinc-300 active:scale-[0.99]"
            >
              Request access
            </button>

            <a
              href="https://karsa-one.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-xs active:scale-[0.99]"
            >
              <span>Sign in</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-600 hover:text-zinc-900 md:hidden"
              aria-label="Toggle navigation menu"
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
          <div className="md:hidden border-t border-zinc-100 bg-white/95 backdrop-blur-md py-4 px-2 space-y-2">
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              The Problem
            </a>
            <a
              href="#idea"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              The Idea
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              How It Works
            </a>
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Capabilities
            </a>
            <a
              href="#status"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Development Status
            </a>
            <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestAccess();
                }}
                className="w-full text-left rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                Request Pilot Access
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
