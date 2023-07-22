import React from "react";
import Question from "./Question";
import {nanoid} from "nanoid"

export default function MainGame(props) {
  const [answersChecked, setAnswersChecked] = React.useState(false)
  const [questions, setQuestions] = React.useState([]);
  const [newGameFlag, setNewGameFlag] = React.useState(false);
  const questionsElements = questions.map((question) => {
    return <Question
      {...question}
      key = {question.id}
      setQuestions = {setQuestions}
      answersChecked = {answersChecked}
    />;
  });

  React.useEffect(() => {
    const fetchUrl = createFetchUrl()
    async function getQuestions() {
      const res = await fetch(fetchUrl);
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

  function createFetchUrl() {
    let baseUrl = `https://opentdb.com/api.php?amount=${props.questionsParameters.numberOfQuestions}`
    if (props.questionsParameters.level !== "any") {
      baseUrl += `&difficulty=${props.questionsParameters.level}`
    }
    if (props.questionsParameters.questionType !== "any") {
      baseUrl += `&type=${props.questionsParameters.questionType}`
    }
    console.log(baseUrl)
    return baseUrl
  }

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
          {countCorrectAnswers()}/{props.questionsParameters.numberOfQuestions}
        </span>
        correct answers
      </div>
    )
  }

  function goToStart() {
    setQuestions([])
    setAnswersChecked(false)
    props.setActiveWindow("startWindow")
  }

  return (
    <div className="mainGame">
      {questionsElements}
      {answersChecked ? 
        <div className="score-button">
          {scoreElement()}
          <button className="main-button" onClick={resetGame}>Play again</button>
        </div>
        :
        <button className="main-button" onClick={checkAnswers}>Check answers</button>
      }
      <div className="return-button" onClick={goToStart}>&larr; Go back</div>
    </div>
  );
}
