import { useState, useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TheProblem } from "./components/TheProblem";
import { TheIdea } from "./components/TheIdea";
import { HowItWorks } from "./components/HowItWorks";
import { FeaturesBento } from "./components/FeaturesBento";
import { TheNumbers } from "./components/TheNumbers";
import { RoadmapStatus } from "./components/RoadmapStatus";
import { InteractiveSandbox } from "./components/InteractiveSandbox";
import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";
import { RequestAccessModal } from "./components/RequestAccessModal";
import { ExportPreviewModal } from "./components/ExportPreviewModal";

export default function App() {
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-[#CF6A12] selection:text-white font-sans antialiased">
      {/* Sticky Top Navbar */}
      <Navbar onRequestAccess={() => setRequestModalOpen(true)} />

      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. The Problem (Dark Section) */}
        <TheProblem />

        {/* 3. The Idea (White Editorial Column) */}
        <TheIdea />

        {/* 4. How It Works (3 Steps) */}
        <HowItWorks />

        {/* 5. Live Interactive System Simulator / Sandbox */}
        <InteractiveSandbox />

        {/* 6. System Capabilities (Bento Grid) */}
        <FeaturesBento onOpenExportPreview={() => setExportModalOpen(true)} />

        {/* 7. The Numbers (Dark Section) */}
        <TheNumbers />

        {/* 8. Status & Roadmap */}
        <RoadmapStatus />

        {/* 9. Final CTA */}
        <CtaSection onRequestAccess={() => setRequestModalOpen(true)} />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Interactive Modals */}
      <RequestAccessModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
      />

      <ExportPreviewModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </div>
  );
}
