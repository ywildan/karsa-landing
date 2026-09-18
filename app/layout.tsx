import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Typography: Instrument Serif gives the academic record an editorial, human voice;
// Geist keeps the product explanations and dense preview UI clear at small sizes.
// Geist Mono is reserved for metadata, with swap and explicit fallbacks for every family.
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap", variable: "--font-instrument", fallback: ["Georgia", "serif"], adjustFontFallback: false });
const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist", fallback: ["system-ui", "sans-serif"], adjustFontFallback: false });
const mono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-geist-mono", fallback: ["monospace"], adjustFontFallback: false });

// Motion: cubic-bezier(0.16, 1, 0.3, 1) settles quickly without bounce, connecting
// participation to its record. Reveals use 600ms, the hero uses 100ms stagger and
// finishes at 1300ms; hover feedback uses 180–240ms, with motion disabled on request.
export const metadata: Metadata = {
  title: "Karsa — Every act of learning deserves a record",
  description: "Every question, answer, and presentation deserves a record. Meet Karsa, the activity tracking system for Universitas Tidar. Launching in 2026/2027.",
  applicationName: "Karsa",
  openGraph: { title: "Karsa — Setiap karsa, satu poin.", description: "A single record of participation. Built for Universitas Tidar.", type: "website", locale: "en_US" },
  twitter: { card: "summary", title: "Karsa — Setiap karsa, satu poin.", description: "A single record of participation. Built for Universitas Tidar." },
};
export const viewport: Viewport = { themeColor: "#FAFAFA" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${instrument.variable} ${geist.variable} ${mono.variable}`}>
    <a href="#main" className="skip-link">Skip to content</a>
    {children}
    <noscript><style>{`[data-motion] { opacity: 1 !important; transform: none !important; } .demo-js { display: none !important; }`}</style></noscript>
  </body></html>;
}
