import { ArrowUpRight } from "lucide-react";
import { LOGIN_URL } from "@/lib/utils";

export function Footer() {
  return <footer id="footer" className="footer"><div className="shell"><div className="footer-grid">
    <div><a href="#hero" className="wordmark" aria-label="Karsa home">karsa<span>.</span></a><p className="footer-tagline">Setiap karsa, satu poin.</p></div>
    <nav aria-label="Footer navigation"><a href="#idea" className="text-link">The idea</a><a href="#status" className="text-link">Development status</a><a href={LOGIN_URL} className="text-link">Open Karsa <ArrowUpRight size={13} aria-hidden="true" /></a></nav>
    <div className="footer-colophon"><span className="label">Made for Universitas Tidar</span><p>Magelang, Indonesia</p><p>© {new Date().getFullYear()} Karsa</p></div>
  </div><div className="footer-bottom"><p>Privacy: previews use illustrative data. Google sign-in takes place in the Karsa app. This page does not collect student records.</p><span className="label">Intention, on the record.</span></div></div></footer>;
}
