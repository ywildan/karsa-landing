"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGIN_URL } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <header id="nav" className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <nav className="shell nav-inner" aria-label="Main navigation">
      <a className="wordmark" href="#hero" aria-label="Karsa home">karsa<span>.</span></a>
      <span className="nav-edition label">A record of participation</span>
      <div className="nav-actions"><a className="text-link" href={LOGIN_URL}>Sign in</a>
        <Button asChild variant="outline" size="sm"><a href="#access">Request access <ArrowUpRight aria-hidden="true" /></a></Button>
      </div>
    </nav>
  </header>;
}
