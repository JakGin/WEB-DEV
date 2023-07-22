import React from "react";

export default function Start({ setActiveWindow }) {
  return (
    <div className="start">
      <h1>Quizzical</h1>
      <p>Trivia quesions quiz</p>
      <button onClick={() => setActiveWindow("mainGameWindow")}>Start quiz</button>
    </div>
  );
}
