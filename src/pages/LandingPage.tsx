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
import { SectionBlend } from "@/components/fx/SectionBlend";
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

    const jump = () => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    };
    const frameId = requestAnimationFrame(jump);
    // Webfont swaps can shift the target after first paint; re-anchor once
    // fonts settle, unless the user has already scrolled away themselves.
    let cancelled = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled && Math.abs(window.scrollY - (document.getElementById(targetId)?.offsetTop ?? 0)) < window.innerHeight) jump();
      });
    }
    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-[#CF6A12] selection:text-white font-sans antialiased">
      <Navbar />

      <main>
        <Hero />
        <TheProblem />
        <SectionBlend from="#0A0A0A" to="#FFFFFF" />
        <TheIdea />
        <HowItWorks />
        <SectionBlend from="#FAFAFA" to="#0A0A0A" />
        <SecurityArchitecture />
        <InteractiveSandbox />
        <SectionBlend from="#09090B" to="#FFFFFF" />
        <FeaturesBento onOpenExportPreview={() => setExportModalOpen(true)} />
        <SectionBlend from="#FFFFFF" to="#0A0A0A" />
        <TheNumbers />
        <SectionBlend from="#0A0A0A" to="#FFFFFF" />
        <RoadmapStatus />
        <SectionBlend from="#FFFFFF" to="#0A0A0A" />
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
