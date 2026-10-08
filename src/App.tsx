import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PrivacyPage from "./pages/PrivacyPage";
import PlanPage from "./pages/PlanPage";
import DownloadComingSoonPage from "./pages/DownloadComingSoonPage";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/paket" element={<PlanPage />} />
        {/* Restore DownloadPage here when public downloads are ready. */}
        <Route path="/download" element={<DownloadComingSoonPage />} />
      </Routes>
    </>
  );
}
