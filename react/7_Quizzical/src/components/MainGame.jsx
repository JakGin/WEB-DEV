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
          const correct_answer = {
            value: item.correct_answer,
            id: nanoid(),
          }
          const incorrect_answers = item.incorrect_answers.map(answer => {
            return {
              value: answer,
              id: nanoid()
            }
          })
          const allAnswers = generateAllAnswers(correct_answer, incorrect_answers)

          return {
            ...item,
            id: nanoid(),
            correct_answer: correct_answer,
            incorrect_answers: incorrect_answers,
            allAnswers: allAnswers,
            selectedAnswerId: undefined,
          }
        })
      );
    }

    getQuestions()
  }, []);

  function generateAllAnswers(correct_answer, incorrect_answers) {
    let allAnswers = [...incorrect_answers]
    let randomIndex = Math.floor(Math.random() * (questions.length + 1))
    allAnswers.splice(randomIndex, 0, correct_answer)
    return allAnswers
  }

  return (
    <div className="mainGame">
      {questionsElements}
      <button>Check answers</button>
    </div>
  );
}
