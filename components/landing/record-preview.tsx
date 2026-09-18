import { ArrowUpRight, Check, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroEntry, Progress } from "./reveal";

export function RecordPreview() {
  return <div className="record-composition" aria-label="Illustrative preview of a participation record">
    <HeroEntry delay={0.5} scale className="record-stage grid-treatment">
      <div className="stage-heading label"><span>Illustrative preview</span><Plus size={14} aria-hidden="true" /></div>
      <span className="record-watermark" aria-hidden="true">+1</span>
      <Card className="register">
        <div className="register-top"><span className="mini-wordmark">karsa<span>.</span></span><Badge>Class record</Badge></div>
        <div className="register-subject"><span className="label">Course / Class A</span><h3>Introduction to learning</h3><p>Participation register</p></div>
        <div className="register-columns label"><span>Student</span><span>Points</span></div>
        <div className="register-row"><span className="avatar">A</span><span>Alya P.</span><span className="row-points">02</span></div>
        <div className="register-row active"><span className="avatar">R</span><span>Raka S.<small>Asked a question</small></span><span className="row-points">+1</span></div>
        <div className="register-row"><span className="avatar">N</span><span>Nadia A.</span><span className="row-points">03</span></div>
        <div className="register-foot"><span className="accent-dot" /> One contribution. On the record.</div>
      </Card>
      <div className="stage-foot label"><span>Fig. 01</span></div>
    </HeroEntry>
    <HeroEntry delay={0.6} className="saved-fragment"><Check size={14} aria-hidden="true" /><span>Participation recorded</span></HeroEntry>
    <HeroEntry delay={0.7} className="report-fragment"><Card className="report-card"><div className="label">Your participation <ArrowUpRight size={14} aria-hidden="true" /></div><div className="report-score"><span>12</span><span>points recorded<br />this semester</span></div><Progress value={72} /><p>Every contribution counts.</p></Card></HeroEntry>
  </div>;
}
