import { ArrowLeft, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageToggle } from "../components/LanguageToggle";
import { Scene3D } from "../components/fx/Scene3D";
import { LocalizedText } from "../i18n/LanguageContext";

export default function DownloadComingSoonPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0A0A0A] font-sans text-white">
      {/* 3D stage background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Scene3D className="absolute left-1/2 top-1/2 h-[720px] w-[720px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70" />
        <div className="dot-grid-dark absolute inset-0 opacity-60" />
        <div className="floor-3d absolute inset-x-0 bottom-0 h-56 opacity-70" />
        <div className="glow-orange absolute left-1/2 top-1/2 h-80 w-[36rem] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />
      </div>

      <header className="glass-dark relative z-10 border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-serif text-2xl font-medium tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CF6A12]">
            karsa
          </Link>
          <LanguageToggle variant="dark" />
        </div>
      </header>

      <main className="perspective-1200 relative z-10 flex flex-1 items-center justify-center px-4 py-20 sm:px-6">
        <div className="glass-dark depth-dark w-full max-w-lg rounded-3xl border border-white/10 px-6 py-10 text-center sm:px-10 sm:py-12">
          <div className="depth-dark mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#CF6A12]/30 bg-[#CF6A12]/10">
            <Clock3 className="h-7 w-7 text-[#CF6A12]" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#CF6A12]">Karsa Mobile</p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-white sm:text-6xl">
            <LocalizedText>Coming soon.</LocalizedText>
          </h1>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-zinc-400">
            <LocalizedText>We’re preparing Karsa Mobile for its public release. Downloads will be available here when it’s ready.</LocalizedText>
          </p>
          <Link to="/" className="mt-9 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#CF6A12] px-5 text-xs font-medium text-white shadow-[0_16px_36px_-12px_rgba(207,106,18,0.65)] transition-all hover:-translate-y-0.5 hover:bg-[#B85B0D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CF6A12]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <LocalizedText>Back to home</LocalizedText>
          </Link>
        </div>
      </main>
    </div>
  );
}
