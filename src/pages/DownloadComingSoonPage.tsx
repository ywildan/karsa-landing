import { ArrowLeft, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageToggle } from "../components/LanguageToggle";
import { LocalizedText } from "../i18n/LanguageContext";

export default function DownloadComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-zinc-950">
      <header className="border-b border-zinc-200/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-serif text-2xl font-medium tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CF6A12]">
            karsa
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="max-w-lg text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#CF6A12]/15 bg-[#CF6A12]/[0.06]">
            <Clock3 className="h-7 w-7 text-[#CF6A12]" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#CF6A12]">Karsa Mobile</p>
          <h1 className="mt-4 font-serif text-6xl tracking-tight sm:text-7xl">
            <LocalizedText>Coming soon.</LocalizedText>
          </h1>
          <p className="mt-6 text-sm leading-7 text-zinc-500">
            <LocalizedText>We’re preparing Karsa Mobile for its public release. Downloads will be available here when it’s ready.</LocalizedText>
          </p>
          <Link to="/" className="mt-9 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-5 text-xs font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CF6A12]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <LocalizedText>Back to home</LocalizedText>
          </Link>
        </div>
      </main>
    </div>
  );
}
