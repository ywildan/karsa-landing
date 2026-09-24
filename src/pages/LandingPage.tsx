import { useState, useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TheProblem } from "@/components/TheProblem";
import { TheIdea } from "@/components/TheIdea";
import { HowItWorks } from "@/components/HowItWorks";
import { SecurityArchitecture } from "@/components/SecurityArchitecture";
import { FeaturesBento } from "@/components/FeaturesBento";
import { TheNumbers } from "@/components/TheNumbers";
import { RoadmapStatus } from "@/components/RoadmapStatus";
import { InteractiveSandbox } from "@/components/InteractiveSandbox";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { RequestAccessModal } from "@/components/RequestAccessModal";
import { ExportPreviewModal } from "@/components/ExportPreviewModal";

export default function LandingPage() {
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;

    const frameId = requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-[#CF6A12] selection:text-white font-sans antialiased">
      <Navbar onRequestAccess={() => setRequestModalOpen(true)} />

      <main>
        <Hero />
        <TheProblem />
        <TheIdea />
        <HowItWorks />
        <SecurityArchitecture />
        <InteractiveSandbox />
        <FeaturesBento onOpenExportPreview={() => setExportModalOpen(true)} />
        <TheNumbers />
        <RoadmapStatus />
        <CtaSection onRequestAccess={() => setRequestModalOpen(true)} />
      </main>

      <Footer />

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
