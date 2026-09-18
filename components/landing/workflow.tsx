import { ArrowRight, Check, Database, ShieldCheck } from "lucide-react";
import { Reveal, Progress } from "./reveal";

function ValidationDiagram() {
  return <svg viewBox="0 0 320 156" role="img" aria-labelledby="validation-title" className="validation-diagram">
    <title id="validation-title">A request passes through a server-side authorization guard before reaching the database.</title>
    <path d="M62 64H257" fill="none" stroke="currentColor" strokeOpacity=".22" />
    <path d="m113 60 5 4-5 4m101-8 5 4-5 4" fill="none" stroke="currentColor" strokeOpacity=".5" />
    <rect x="20" y="40" width="56" height="48" rx="8" fill="#FAFAFA" stroke="#dededb" />
    <rect x="131" y="35" width="58" height="58" rx="8" fill="#CF6A12" />
    <rect x="244" y="40" width="56" height="48" rx="8" fill="#FAFAFA" stroke="#dededb" />
    <path d="m39 58-7 6 7 6m18-12 7 6-7 6m-6-16-5 20" fill="none" stroke="#0A0A0A" strokeWidth="1.5" />
    <ShieldCheck x={147} y={51} width={26} height={26} color="#0A0A0A" strokeWidth={1.5} />
    <Database x={260} y={52} width={24} height={24} color="#0A0A0A" strokeWidth={1.5} />
    <g fill="currentColor" fontSize="10" textAnchor="middle" className="svg-mono"><text x="48" y="118">REQUEST</text><text x="160" y="118">GUARD</text><text x="272" y="118">DATABASE</text></g>
  </svg>;
}

export function Workflow() {
  return <section id="workflow" className="section workflow" aria-labelledby="workflow-title"><div className="shell">
    <Reveal className="section-heading"><div><p className="label section-label">03 — How it works</p><h2 id="workflow-title" className="display-title">From a moment<br />to a <em>record.</em></h2></div><p className="heading-aside">A short path from participation<br />to something you can see.</p></Reveal>
    <div className="workflow-grid">
      <Reveal><article className="workflow-step"><div className="step-heading"><span className="label">Step 01</span><ArrowRight size={18} aria-hidden="true" /></div><div className="workflow-visual grid-treatment"><div className="input-example"><span className="label">Record participation</span><div className="example-student"><span className="avatar">R</span><span>Raka S.</span><Check size={15} aria-hidden="true" /></div><div className="point-options" aria-label="Illustrative point selection"><span>1</span><span className="selected">2</span><span>3</span><span>4</span></div><div className="example-save">Record points <Check size={13} aria-hidden="true" /></div></div></div><h3>The instructor opens Karsa</h3><p>Three taps from phone to point.</p><span className="step-note">Assigned PJ records participation for the class.</span></article></Reveal>
      <Reveal delay={0.08}><article className="workflow-step"><div className="step-heading"><span className="label">Step 02</span><ArrowRight size={18} aria-hidden="true" /></div><div className="workflow-visual"><ValidationDiagram /></div><h3>The system validates</h3><p>Server-side. Every time. No exceptions.</p><span className="step-note">The right role. The right course. The right class.</span></article></Reveal>
      <Reveal delay={0.16}><article className="workflow-step"><div className="step-heading"><span className="label">Step 03</span><Check size={18} aria-hidden="true" /></div><div className="workflow-visual"><div className="workflow-report"><div className="label">Personal report <span className="accent-dot" /></div><div className="report-score"><span>12</span><span>points<br />this semester</span></div><Progress value={72} /><div className="report-bottom"><span>Latest contribution</span><strong>+2 points</strong></div></div></div><h3>The student sees</h3><p>Real-time. Transparent. Fair.</p><span className="step-note">A personal view of every recorded contribution.</span></article></Reveal>
    </div><p className="visual-caption label">Illustrative previews / no student data displayed</p>
  </div></section>;
}
