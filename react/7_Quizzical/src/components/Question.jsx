import React from "react"
import {decode} from 'html-entities';

export default function Question(props) {


  const answersElements = props.allAnswers.map(answer => {
    return (
      <div className="answer">
        {decode(answer)}
      </div>
    )
  })

  return (
    <div className="question">
      <h2>{decode(props.question)}</h2>
      <div className="answers">
        {answersElements}
      </div>
      <hr />
    </div>
  )
}
