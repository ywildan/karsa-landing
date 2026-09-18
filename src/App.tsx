import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PrivacyPage from "./pages/PrivacyPage";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </>
  );
}
