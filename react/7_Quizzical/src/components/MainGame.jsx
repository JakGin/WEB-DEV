import React from "react";
import Question from "./Question";
import {nanoid} from "nanoid"

export default function MainGame() {
  const [questions, setQuestions] = React.useState([]);
  const questionsElements = questions.map((question) => {
    return <Question
      {...question}
      key = {question.id}
    />;
  });

  React.useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await res.json();
      setQuestions(
        data.results.map((item) => {
          const allAnswers = generateAllAnswers(item)

          return {
            ...item,
            id: nanoid(),
            allAnswers: allAnswers,
          };
        })
      );
    }

    getQuestions()
  }, []);

  function generateAllAnswers(question) {
    let allAnswers = [...question.incorrect_answers]
    let randomIndex = Math.floor(Math.random() * (questions.length + 1))
    allAnswers.splice(randomIndex, 0, question.correct_answer)
    return allAnswers
  }

  return (
    <div className="mainGame">
      {questionsElements}
      <button>Check answers</button>
    </div>
  );
}
