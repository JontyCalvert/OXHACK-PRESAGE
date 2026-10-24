import { useState } from "react";
import "./App.css";
import BreathingExercise from "./BreathingExercise";
import CameraPanel from "./CameraPanel";

type Mode = "home" | "quick-focus" | "study-master" | "calm-reset";

function App() {
  const [mode, setMode] = useState<Mode>("home");

  if (mode !== "home") {
    return (
      <main className="app">
        <section className="card">
          <button className="back-button" onClick={() => setMode("home")}>
            ← Back
          </button>

          <p className="eyebrow">FOCUSFLOW</p>

          <h1>
            {mode === "quick-focus" && "Quick Focus"}
            {mode === "study-master" && "Study Master"}
            {mode === "calm-reset" && "Calm Reset"}
          </h1>

          <p className="subtitle">
            {mode === "quick-focus" &&
              "Settle into a focused study session with gentle guidance."}
            {mode === "study-master" &&
              "Discover the study rhythm that works best for you."}
            {mode === "calm-reset" &&
              "Take a moment to slow down and reset your breathing."}
          </p>

          {mode === "quick-focus" ? (
            <CameraPanel caption="Settle in and get comfortable." />
          ) : mode === "calm-reset" ? (
            <BreathingExercise
              cycles={3}
              onComplete={() => setMode("home")}
            />
          ) : (
            <div className="placeholder-panel">
              <span className="placeholder-icon">◌</span>
              <strong>Study Master is coming next.</strong>
              <p>We’ll compare study techniques and learn what works for you.</p>
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <section className="card home-card">
        <p className="eyebrow">FOCUSFLOW</p>

        <h1>Study in a way that feels right for you.</h1>

        <p className="subtitle">
          A gentle study companion that learns when you focus best and when
          your mind needs time to recover.
        </p>

        <div className="mode-list">
          <button
            className="mode-card"
            onClick={() => setMode("quick-focus")}
          >
            <span className="mode-icon">✦</span>
            <span>
              <strong>Quick Focus</strong>
              <small>Start a guided study session</small>
            </span>
            <span className="arrow">→</span>
          </button>

          <button
            className="mode-card"
            onClick={() => setMode("study-master")}
          >
            <span className="mode-icon">◒</span>
            <span>
              <strong>Study Master</strong>
              <small>Find your personalised study rhythm</small>
            </span>
            <span className="arrow">→</span>
          </button>

          <button
            className="mode-card"
            onClick={() => setMode("calm-reset")}
          >
            <span className="mode-icon">○</span>
            <span>
              <strong>Calm Reset</strong>
              <small>Take a guided breathing break</small>
            </span>
            <span className="arrow">→</span>
          </button>
        </div>

        <p className="privacy-note">
          Your camera helps provide live wellbeing insights. Camera footage
          will not be saved.
        </p>
      </section>
    </main>
  );
}

export default App;
