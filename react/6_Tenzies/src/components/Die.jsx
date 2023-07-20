import React from "react";
import "/src/styles/Die.css";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  let dieElement = "";
  if (props.value == 1) {
    dieElement = (
      <div className={`die-dot${props.value}`}>
        <span className="dot"></span>
      </div>
    );
  } else if (props.value == 2) {
    dieElement = (
      <div className={`die-dot${props.value}`}>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    );
  } else if (props.value == 3) {
    dieElement = (
      <div className={`die-dot${props.value}`}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    );
  } else if (props.value == 4) {
    dieElement = (
      <div className={`die-dot${props.value}`}>
        <div className="die-column">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="die-column">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    );
  } else if (props.value == 5) {
    dieElement = (
      <div className={`die-dot${props.value}`}>
        <div className="die-column">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="die-column">
          <span className="dot"></span>
        </div>
        <div className="die-column">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    );
  } else if (props.value == 6) {
    dieElement = (
      <div className={`die-dot${props.value}`}>
        <div className="die-column">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="die-column">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="die-column">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      {dieElement}
    </div>
  );
}
