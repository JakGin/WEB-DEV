import React from "react";
import "../styles/cards.css";

function Card(props) {
  return (
    <div className="card">
      <div className="price-tag">
        <span className="dollar">$</span>
        {props.price}
      </div>
      <div className="img">
      <img src={`/images/${props.img}`} alt="location image" width="300" />
      </div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}

export default Card;
