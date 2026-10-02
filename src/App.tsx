import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PrivacyPage from "./pages/PrivacyPage";
import { ScrollToTop } from "./components/ScrollToTop";

const DownloadPage = lazy(() => import("./pages/DownloadPage"));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/download"
          element={
            <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] p-8 text-sm text-zinc-500">Memuat halaman unduhan...</div>}>
              <DownloadPage />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
