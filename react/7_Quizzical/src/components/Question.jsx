import React from "react";
import { decode } from "html-entities";

export default function Question(props) {
  const answersElements = props.allAnswers.map((answer) => {
    const styles = markWithColor(answer)

    return (
      <div
        className="answer"
        onClick={() => {props.answersChecked ? {} : selectAnswer(answer)}}
        key={answer.id}
        style={styles}
      >
        {decode(answer.value)}
      </div>
    )
  });

  function markWithColor(answer) {
    const styles = {backgroundColor: "#F5F7FB"}

    if (props.selectedAnswerId === answer.id) {
      if (props.answersChecked) {
        if (answer.id === props.correct_answer.id) {
          styles.backgroundColor = "#94D7A2"
        } else {
          styles.backgroundColor = "#F8BCBC"
        }
      } else {
        styles.backgroundColor = "#D6DBF5"
      }
    }
    if (props.answersChecked) {
      if (answer.id === props.correct_answer.id) {
        styles.backgroundColor = "#94D7A2"
      }
    }

    return styles
  }

  function selectAnswer(answer) {
    props.setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === props.id) {
          return {
            ...question,
            selectedAnswerId: answer.id === question.selectedAnswerId ? undefined : answer.id,
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
      {
        props.selectedAnswerId === undefined && props.answersChecked &&
        <div className="no-selection-alert">You didn't give the answer!</div>
      }
      <hr />
    </div>
  );
}
