"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Check, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE } from "./reveal";

const INITIAL_POINTS = 12;

export function InputDemo() {
  const [student, setStudent] = useState<string | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [sessionPoints, setSessionPoints] = useState(INITIAL_POINTS);
  const reducedMotion = useReducedMotion();
  const animatedPoints = useMotionValue(INITIAL_POINTS);
  const displayedPoints = useTransform(animatedPoints, Math.round);

  useEffect(() => {
    if (reducedMotion || sessionPoints === INITIAL_POINTS) {
      animatedPoints.set(sessionPoints);
      return;
    }

    const animation = animate(animatedPoints, sessionPoints, {
      duration: 0.6,
      ease: EASE,
    });

    return () => animation.stop();
  }, [animatedPoints, reducedMotion, sessionPoints]);

  const record = () => {
    if (!student || points === null || saved) return;
    setSessionPoints(total => total + points);
    setSaved(true);
  };

  // Manual reset keeps the result available until the user is ready.
  const reset = () => {
    animatedPoints.stop();
    animatedPoints.set(INITIAL_POINTS);
    setSessionPoints(INITIAL_POINTS);
    setStudent(null);
    setPoints(null);
    setSaved(false);
  };

  return <div className="input-demo demo-js">
    <div className="demo-heading label"><span>Try an illustrative record</span><span>0{saved ? 3 : points ? 2 : student ? 1 : 0} / 03</span></div>
    <div className="demo-counter">
      <span>This session:</span>
      <strong aria-hidden="true">
        <motion.span>{displayedPoints}</motion.span> points
      </strong>
      <span className="sr-only">{sessionPoints} points</span>
    </div>
    <fieldset disabled={saved}><legend className="demo-legend">Choose a student</legend><div className="demo-students">{["Alya P.", "Raka S."].map(name => <button type="button" key={name} onClick={() => setStudent(name)} aria-pressed={student === name} className="demo-student"><span className="avatar" aria-hidden="true">{name[0]}</span>{name}{student === name && <Check size={14} aria-hidden="true" />}</button>)}</div></fieldset>
    <fieldset disabled={!student || saved}><legend className="demo-legend">Choose points</legend><div className="demo-points">{[1, 2, 3, 4].map(n => <button type="button" key={n} onClick={() => setPoints(n)} aria-pressed={points === n} aria-label={`${n} ${n === 1 ? "point" : "points"}`}>{n}</button>)}</div></fieldset>
    <Button type="button" className="demo-submit" disabled={!student || !points || saved} onClick={record}>
      {saved ? <>Recorded <Check aria-hidden="true" /></> : <>Record points <ArrowRight aria-hidden="true" /></>}
    </Button>
    <div className="demo-feedback">
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={saved ? "demo-success" : undefined}
      >
        {saved ? <>
          <Check size={16} aria-hidden="true" />
          <span>
            <strong>{student} +{points} {points === 1 ? "point" : "points"}</strong>
            {" — Illustrative preview only."}
            <span className="sr-only"> Session total: {sessionPoints} points.</span>
          </span>
        </> : "A sample record. Nothing is sent or stored."}
      </p>
      <button type="button" onClick={reset} className="demo-reset">
        <RotateCcw size={14} aria-hidden="true" />
        Reset demo
      </button>
    </div>
  </div>;
}
