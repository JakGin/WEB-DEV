import React from "react";
import "/src/styles/card.css";

function Card(props) {
  let textBadge;
  if (props.openSpots === 0) {
    textBadge = "SOLD OUT";
  } else if (props.location === "Online") {
    textBadge = "ONLINE";
  }

  return (
    <div className="card">
      {textBadge && <div className="card--badge">{textBadge}</div>}

      <img
        src={`/images/${props.coverImg}`}
        alt="cover image"
        className="card--image"
        width="200"
      />
      <div className="card-stats">
        <img src="/images/star.png" className="card--star" />
        <span>{props.stats.rating}</span>
        <span className="gray">({props.stats.reviewCount}) • </span>
        <span className="gray">{props.location}</span>
      </div>
      <p className="card--title">{props.title}</p>
      <p className="card--price">
        <span className="bold">From ${props.price}</span> / person
      </p>
    </div>
  );
}

export default Card;
