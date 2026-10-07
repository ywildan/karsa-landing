import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PrivacyPage from "./pages/PrivacyPage";
import DownloadComingSoonPage from "./pages/DownloadComingSoonPage";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        {/* Restore DownloadPage here when public downloads are ready. */}
        <Route path="/download" element={<DownloadComingSoonPage />} />
      </Routes>
    </>
  );
}
