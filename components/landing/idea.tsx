import { Reveal } from "./reveal";

export function Idea() {
  return <section id="idea" className="section idea" aria-labelledby="idea-title"><div className="shell"><Reveal className="reading-column">
    <p className="label section-label">02 — The idea</p><h2 id="idea-title" className="display-title">A single record.<br />Built with <em>intention.</em></h2>
    <p className="body-large idea-body">Karsa was built on one principle: every act of participation — a question, an answer, a presentation — deserves a permanent, transparent record. Not a grade. Not a metric. A record.</p>
    <figure className="idea-quote"><span className="quote-mark" aria-hidden="true">“</span><blockquote>The word <em>karsa</em> comes from Sanskrit — it means will, intention, the spirit to create.</blockquote><figcaption className="label">Etymology &amp; design philosophy</figcaption></figure>
  </Reveal></div></section>;
}
