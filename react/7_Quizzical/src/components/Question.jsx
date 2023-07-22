import React from "react";
import { decode } from "html-entities";

export default function Question(props) {
  const answersElements = props.allAnswers.map((answer) => {
    const styles = {
      backgroundColor:
        answer.id === props.selectedAnswerId ? "#D6DBF5" : "#F5F7FB",
    };
    return (
      <div
        className="answer"
        onClick={() => selectAnswer(answer)}
        key={answer.id}
        style={styles}
      >
        {decode(answer.value)}
      </div>
    );
  });

  function selectAnswer(answer) {
    props.setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === props.id) {
          return {
            ...question,
            selectedAnswerId: answer.id,
          };
        } else {
          return question;
        }
      })
    );
  }

  return (
    <div className="question">
      <h2>{decode(props.question)}</h2>
      <div className="answers">{answersElements}</div>
      <hr />
    </div>
  );
}
