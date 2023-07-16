import React from "react"
import "/src/styles/Card.css"

function Card(props) {
  return (
    <div className="card">
      {props.day}
      {props.temperature}
      {props.wind}
      {props.rain}
    </div>  
  )
}

export default Card