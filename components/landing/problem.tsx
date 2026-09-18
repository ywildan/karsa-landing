import { Reveal } from "./reveal";

const problems = [
  ["Physical attrition", "Instructors carry notebooks to every session. Pages tear. Ink smears. Coffee spills."],
  ["Data decay", "By exam week, the log is incomplete. Half the points were never tallied. The instructor reconstructs from memory."],
  ["No visibility", "Students have no way to see where they stand until the final grade is posted. By then, it's too late."],
];

export function Problem() {
  return <section id="problem" className="section dark-section" aria-labelledby="problem-title"><div className="shell problem-grid">
    <Reveal><p className="label section-label">01 — The problem</p><h2 id="problem-title" className="display-title">Points recorded<br />on paper are<br /><em>points lost.</em></h2><div className="problem-footnote"><span className="tiny-rule" /><span className="label">A familiar system. A fragile record.</span></div></Reveal>
    <div className="problem-list">{problems.map(([label, body], index) => <Reveal key={label} delay={index * 0.08}><article><div className="problem-index label">0{index + 1}</div><div><h3 className="label">{label}</h3><p>{body}</p></div></article></Reveal>)}</div>
  </div></section>;
}
