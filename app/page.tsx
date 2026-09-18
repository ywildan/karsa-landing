import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { Idea } from "@/components/landing/idea";
import { Workflow } from "@/components/landing/workflow";
import { Features } from "@/components/landing/features";
import { Numbers } from "@/components/landing/numbers";
import { Status } from "@/components/landing/status";
import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return <><Nav /><main id="main" tabIndex={-1}>
    <Hero /><Problem /><Idea /><Workflow /><Features /><Numbers /><Status /><Cta />
  </main><Footer /></>;
}
