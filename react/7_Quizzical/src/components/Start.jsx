import React from "react";

export default function Start({ setActiveWindow }) {
  return (
    <div className="start">
      <h1>Quizzical</h1>
      <p>Trivia quesions quiz</p>
      <form>
        <label for="customRange3" class="form-label">Number of questions: {}</label>
        <input type="range" class="form-range" min="5" max="30" step="5" id="customRange3" />
        <label for="my-select">Select an option:</label>
        <select id="my-select" name="my-select">
          <option value="option1">Any</option>
          <option value="option1">Easy</option>
          <option value="option2">Medium</option>
          <option value="option3">Hard</option>
        </select>
        <label for="my-select">Select an option:</label>
        <select id="my-select" name="my-select">
          <option value="option1">Any</option>
          <option value="option2">Multiple choice</option>
          <option value="option3">Tru/False</option>
        </select>
      </form>  
      <button onClick={() => setActiveWindow("mainGameWindow")}>Start quiz</button>
    </div>
  );
}
