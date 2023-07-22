import React from "react";

export default function Start({
  setActiveWindow,
  questionsParameters,
  setQuestionsParameters,
}) {
  function setupGame() {
    setActiveWindow("mainGameWindow");
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setQuestionsParameters((prevParameter) => {
      return {
        ...prevParameter,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  return (
    <div className="start">
      <h1>Quizzical</h1>
      <p>Trivia quesions quiz</p>
      <form>
        <label htmlFor="numberOfQuestions" className="form-label">
          Number of questions: {questionsParameters.numberOfQuestions}
        </label>
        <input
          type="range"
          className="form-range"
          min="5"
          max="30"
          step="5"
          id="numberOfQuestions"
          name="numberOfQuestions"
          value={questionsParameters.numberOfQuestions}
          onChange={handleChange}
        />
        <label htmlFor="level">Select level</label>
        <select
          value={questionsParameters.level}
          id="level"
          name="level"
          className="select"
          onChange={handleChange}
        >
          <option value="any">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label htmlFor="questionType">Select quesions type</label>
        <select
          value={questionsParameters.questionType}
          id="questionType"
          name="questionType"
          className="select"
          onChange={handleChange}
        >
          <option value="any">Any</option>
          <option value="multiple">Multiple choice</option>
          <option value="boolean">True/False</option>
        </select>
      </form>
      <button onClick={setupGame}>Start quiz</button>
    </div>
  );
}
