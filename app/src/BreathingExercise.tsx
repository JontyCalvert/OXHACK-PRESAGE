import { useEffect, useState } from "react";
import "./BreathingExercise.css";

type BreathingPhase = "in" | "hold" | "out";

type BreathingExerciseProps = {
  cycles?: number;
  onComplete?: () => void;
};

const phases: Array<{ name: BreathingPhase; label: string; seconds: number }> = [
  { name: "in", label: "Breathe in", seconds: 4 },
  { name: "hold", label: "Hold gently", seconds: 4 },
  { name: "out", label: "Breathe out", seconds: 6 },
];

export default function BreathingExercise({
  cycles = 3,
  onComplete,
}: BreathingExerciseProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(phases[0].seconds);
  const [cycle, setCycle] = useState(1);

  const phase = phases[phaseIndex];
  const progress = ((phase.seconds - secondsLeft) / phase.seconds) * 100;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current > 1) return current - 1;

        const nextPhase = phaseIndex + 1;
        if (nextPhase < phases.length) {
          setPhaseIndex(nextPhase);
          return phases[nextPhase].seconds;
        }

        if (cycle >= cycles) {
          window.clearInterval(timer);
          onComplete?.();
          return 0;
        }

        setCycle((currentCycle) => currentCycle + 1);
        setPhaseIndex(0);
        return phases[0].seconds;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [cycle, cycles, onComplete, phaseIndex]);

  return (
    <div className={`breathing-exercise phase-${phase.name}`}>
      <div className="breathing-ring" style={{ "--progress": `${progress}%` } as React.CSSProperties}>
        <div className="breathing-ball" />
        <div className="breathing-circle-content">
          <span className="breathing-label">{phase.label}</span>
          <strong>{secondsLeft}</strong>
          <small>Cycle {cycle} of {cycles}</small>
        </div>
      </div>
    </div>
  );
}