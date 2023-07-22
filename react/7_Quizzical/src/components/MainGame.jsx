import React from "react";
import Question from "./Question";
import {nanoid} from "nanoid"

export default function MainGame() {
  const numberOfQuestions = 20
  const [answersChecked, setAnswersChecked] = React.useState(false)
  const [questions, setQuestions] = React.useState([]);
  const [newGameFlag, setNewGameFlag] = React.useState(false);
  const questionsElements = questions.map((question) => {
    return <Question
      {...question}
      key = {question.id}
      setQuestions = {setQuestions}
    />;
  });

  React.useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=easy`
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
  }, [newGameFlag]);

  function generateAllAnswers(correct_answer, incorrect_answers) {
    let allAnswers = [...incorrect_answers]
    let randomIndex = Math.floor(Math.random() * (allAnswers.length + 1))
    allAnswers.splice(randomIndex, 0, correct_answer)
    return allAnswers
  }

  function checkAnswers() {
    setAnswersChecked(true)
    
  }

  function resetGame() {
    setQuestions([])
    setAnswersChecked(false)
    setNewGameFlag(prevFlag => !prevFlag)
  }

  function countCorrectAnswers() {
    let counter = 0;
    questions.forEach(question => {
      if (question.correct_answer.id === question.selectedAnswerId) {
        counter++;
      }
    })
    return counter;
  }

  function scoreElement() {
    return (
      <div className="score">
        You scored
        <span className="score-points">
          {countCorrectAnswers()}/{numberOfQuestions}
        </span>
        correct answers
      </div>
    )
  }

  return (
    <div className="mainGame">
      {questionsElements}
      {answersChecked ? 
        <div className="score-button">
          {scoreElement()}
          <button onClick={resetGame}>Play again</button>
        </div>
        :
        <button onClick={checkAnswers}>Check answers</button>
      }
      
    </div>
  );
}
