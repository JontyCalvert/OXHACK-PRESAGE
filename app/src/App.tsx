import { useState } from "react";
import "./App.css";

type Phase = "ready" | "baseline" | "study" | "break" | "results";

function App() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [focus, setFocus] = useState(7);
  const [fatigue, setFatigue] = useState(4);

  const startSession = () => {
    setPhase("baseline");

    setTimeout(() => {
      setPhase("study");
    }, 5000);
  };

  const finishStudy = () => {
    setPhase("break");

    setTimeout(() => {
      setPhase("results");
    }, 5000);
  };

  return (
    <main className="app">
      <section className="card">
        <div className="eyebrow">FOCUSFLOW</div>

        {phase === "ready" && (
          <>
            <h1>Study smarter, not longer.</h1>
            <p className="subtitle">
              Find the study routine that helps you focus without burning out.
            </p>

            <div className="privacy">
              <strong>Privacy first</strong>
              <p>
                Your camera helps measure live wellbeing signals. No camera
                footage is saved.
              </p>
            </div>

            <button onClick={startSession}>Start check-in</button>
          </>
        )}

        {phase === "baseline" && (
          <>
            <h1>Getting your baseline</h1>
            <p className="subtitle">
              Sit comfortably and look towards the camera.
            </p>

            <div className="camera-placeholder">
              <div className="camera-icon">◉</div>
              <p>Camera measurement active</p>
              <small>Keep still for a few seconds</small>
            </div>

            <div className="status">Collecting your normal readings...</div>
          </>
        )}

        {phase === "study" && (
          <>
            <h1>Focus session</h1>
            <p className="subtitle">
              Work on one task. We’ll help you understand your ideal rhythm.
            </p>

            <div className="timer">02:00</div>

            <div className="metrics">
              <div>
                <span>Heart rate</span>
                <strong>-- bpm</strong>
              </div>
              <div>
                <span>Breathing</span>
                <strong>-- / min</strong>
              </div>
            </div>

            <div className="status">Waiting for a reliable signal...</div>

            <button onClick={finishStudy}>Finish study session</button>
          </>
        )}

        {phase === "break" && (
          <>
            <h1>Time to recover</h1>
            <p className="subtitle">
              Take a short break before rating how the session felt.
            </p>

            <div className="breathing">
              <div className="breathing-circle">Breathe</div>
            </div>

            <div className="status">Try a slow, comfortable breath.</div>
          </>
        )}

        {phase === "results" && (
          <>
            <h1>Your first recommendation</h1>
            <p className="subtitle">
              Help FocusFlow learn what works best for you.
            </p>

            <label>
              How focused did you feel? <strong>{focus}/10</strong>
              <input
                type="range"
                min="1"
                max="10"
                value={focus}
                onChange={(event) => setFocus(Number(event.target.value))}
              />
            </label>

            <label>
              How tired do you feel? <strong>{fatigue}/10</strong>
              <input
                type="range"
                min="1"
                max="10"
                value={fatigue}
                onChange={(event) => setFatigue(Number(event.target.value))}
              />
            </label>

            <div className="recommendation">
              <span>RECOMMENDED NEXT STEP</span>
              <h2>
                {fatigue >= 7
                  ? "Try shorter study blocks with longer breaks."
                  : focus >= 8
                    ? "You may benefit from a longer focused session."
                    : "Try a 25-minute session with a 5-minute break."}
              </h2>
            </div>

            <button onClick={() => setPhase("ready")}>Start again</button>
          </>
        )}
      </section>
    </main>
  );
}

export default App;