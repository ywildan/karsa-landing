import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./reveal";

const milestones = [
  { state: "Done", title: "Foundation, auth, admin panel, point input", detail: "The groundwork for a dependable record." },
  { state: "Done", title: "Student report, class leaderboard", detail: "Participation becomes visible." },
  { state: "Done", title: "Semester recap & Excel export", detail: "A complete view at the end of the semester." },
  { state: "Next", title: "Security hardening", detail: "Preparing the system for campus use." },
  { state: "Launch", title: "Academic year 2026/2027", detail: "Planned for the second semester (Genap)." },
];

export function Status() {
  return <section id="status" className="section status" aria-labelledby="status-title"><div className="shell status-grid">
    <Reveal><p className="label section-label">05 — Status</p><h2 id="status-title" className="display-title">In active<br /><em>development.</em></h2><p className="status-description">Built deliberately.<br />A little closer to campus, every day.</p><Badge className="development-badge"><span className="accent-dot" />Phase 4C / 6</Badge></Reveal>
    <Reveal delay={0.1}><ol className="timeline">{milestones.map(({ state, title, detail }, index) => <li key={title} className={state === "Done" ? "complete" : state === "Next" ? "next" : "planned"}><span className="timeline-dot" aria-hidden="true">{state === "Done" && <Check size={11} />}</span><div className="timeline-meta"><span className="label">{state}</span><span className="label">0{index + 1}</span></div><h3>{title}</h3><p>{detail}</p></li>)}</ol></Reveal>
  </div></section>;
}
