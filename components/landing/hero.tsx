import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGIN_URL } from "@/lib/utils";
import { HeroEntry } from "./reveal";
import { RecordPreview } from "./record-preview";

export function Hero() {
  return <section id="hero" className="hero section" aria-labelledby="hero-title">
    <div className="shell hero-grid">
      <div className="hero-copy">
        <HeroEntry><p className="label eyebrow"><span className="accent-dot" />Karsa / Est. 2026 / Untidar</p></HeroEntry>
        <h1 id="hero-title" className="hero-title">
          <HeroEntry inline delay={0.1}>Every act of learning</HeroEntry>
          <HeroEntry inline delay={0.2}>deserves a <em>record.</em></HeroEntry>
        </h1>
        <HeroEntry delay={0.3}><p className="hero-description">Karsa is the activity tracking system for Universitas Tidar. It replaces paper logs and spreadsheets with a single source of truth — for students, instructors, and administrators.</p></HeroEntry>
        <HeroEntry delay={0.4}><div className="hero-actions">
          <Button asChild><a href={LOGIN_URL}>Sign in with Google <ArrowUpRight aria-hidden="true" /></a></Button>
          <Button asChild variant="ghost"><a href="#problem">Read the story <ArrowDown aria-hidden="true" /></a></Button>
        </div><p className="access-note">Only @students.untidar.ac.id can sign in.</p></HeroEntry>
      </div>
      <RecordPreview />
      <div className="hero-bottom"><span className="label">Made for the moments that matter.</span><span className="label">Scroll to discover <ArrowDown size={12} aria-hidden="true" /></span></div>
    </div>
  </section>;
}
