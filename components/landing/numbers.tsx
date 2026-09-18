import { Reveal } from "./reveal";

export function Numbers() {
  return <section id="numbers" className="section dark-section numbers" aria-labelledby="numbers-title"><div className="shell">
    <Reveal><div className="numbers-top"><h2 id="numbers-title" className="label">Less to manage. More to remember.</h2><span className="label">The principle, in numbers</span></div></Reveal>
    <div className="numbers-grid">{[["1", "record", "One place for every contribution."], ["3", "taps", "From participation to recorded."], ["0", "spreadsheets", "No manual tallying required."]].map(([number, title, description], index) => <Reveal key={title} delay={index * 0.08}><div className="number-item"><span className="giant-number">{number}</span><h3>{title}</h3><p>{description}</p></div></Reveal>)}</div>
    <Reveal><p className="numbers-tagline">Setiap karsa, <em>satu poin.</em></p></Reveal>
  </div></section>;
}
