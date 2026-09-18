import { ArrowDownToLine, Check, LockKeyhole, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./reveal";
import { InputDemo } from "./input-demo";

export function Features() {
  return <section id="features" className="section features" aria-labelledby="features-title"><div className="shell">
    <Reveal className="section-heading"><div><p className="label section-label">04 — Built with purpose</p><h2 id="features-title" className="display-title">Everything in its<br /><em>right place.</em></h2></div><p className="heading-aside">Specific tools for a specific campus.<br />Every detail has a job.</p></Reveal>
    <div className="bento-grid">
      <Reveal className="feature-input"><Card className="feature-card"><CardHeader><span className="label feature-kicker">Less friction, more participation</span><CardTitle>Three-tap input</CardTitle></CardHeader><CardContent><p>Choose a student. Set the points. Record the moment. Built for the phone already in your hand.</p><InputDemo /><noscript><p className="mt-8">The interactive example needs JavaScript. The workflow above shows all three steps.</p></noscript></CardContent></Card></Reveal>
      <Reveal className="feature-leaderboard" delay={0.05}><Card className="feature-card"><CardHeader><CardTitle>Class-scoped leaderboard</CardTitle><p>Every student sees only their class. Names masked for privacy.</p></CardHeader><CardContent><div className="leaderboard" aria-label="Illustrative class leaderboard"><div><span>01</span><span>A*** P***</span><span className="leader-line long" /><strong>18 <small>pts</small></strong></div><div><span>02</span><span>R*** S***</span><span className="leader-line medium" /><strong>12 <small>pts</small></strong></div><div><span>03</span><span>N*** A***</span><span className="leader-line short" /><strong>10 <small>pts</small></strong></div></div><span className="label leaderboard-note">Class A / Illustrative preview</span></CardContent></Card></Reveal>
      <Reveal className="feature-roles" delay={0.08}><Card className="feature-card"><CardHeader><Users className="feature-icon" size={21} aria-hidden="true" /><CardTitle>Multi-role</CardTitle></CardHeader><CardContent><p>Admin. PJ. Student.<br />One system.</p><div className="role-chips"><Badge>Admin</Badge><Badge>PJ</Badge><Badge>Student</Badge></div></CardContent></Card></Reveal>
      <Reveal className="feature-export" delay={0.1}><Card className="feature-card"><CardHeader><ArrowDownToLine className="feature-icon" size={21} aria-hidden="true" /><CardTitle>Excel export</CardTitle></CardHeader><CardContent><p>Per class. Per semester.<br />One click.</p><div className="export-file"><span className="label">Semester recap</span><span className="file-extension">.xlsx</span></div></CardContent></Card></Reveal>
      <Reveal className="feature-auth" delay={0.08}><Card className="feature-card"><CardHeader><CardTitle>Domain-locked auth</CardTitle><p>Only @students.untidar.ac.id can sign in.</p></CardHeader><CardContent><div className="domain-display"><LockKeyhole size={17} aria-hidden="true" /><span>@students.untidar.ac.id</span><Check size={15} aria-hidden="true" /></div></CardContent></Card></Reveal>
      <Reveal className="feature-paper" delay={0.12}><Card className="feature-card"><span className="paper-zero" aria-hidden="true">0</span><CardHeader><CardTitle>Zero paper</CardTitle></CardHeader><CardContent><p>Every record.<br />Permanent.</p></CardContent></Card></Reveal>
    </div>
  </div></section>;
}
