import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGIN_URL } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Cta() {
  return <section id="access" className="section cta" aria-labelledby="cta-title"><div className="shell"><Reveal>
    <p className="label section-label"><span className="accent-dot" />A place for your participation</p>
    <h2 id="cta-title" className="display-title">Built for Universitas Tidar.<br /><em>Launching soon.</em></h2><p className="body-large">Sign in to preview the current build.</p>
    <Button asChild size="lg"><a href={LOGIN_URL}>Sign in with Google <ArrowUpRight aria-hidden="true" /></a></Button>
    <p className="access-note">Only @students.untidar.ac.id</p><p className="access-explanation">Preview access uses your university Google account.<br />Campus launch is planned for semester Genap 2026/2027.</p>
  </Reveal></div></section>;
}
