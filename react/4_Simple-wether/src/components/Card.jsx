import React from "react";
import "/src/styles/Card.css";

function Card(props) {
  return (
    <div className="card">
      <div className="date">{props.date}</div>
      <div className="weather-info">
        <div className="temperature element">
          <img
            src={props.temperature >= 0 ? "/images/sun.png" : "/images/snow-flake.png"}
            alt="sun"
            width="30"
          />
          {props.temperature}
          <div className="units">[{props.units.temperature}]</div>
        </div>
        <div className="wind element">
          <img src="/images/wind.png" alt="wind" width="30" />
          {props.wind}
          <div className="units">[{props.units.wind}]</div>
        </div>
        <div className="rain element">
          <img src="/images/rain.png" alt="rain" width="30" />
          {props.rain}
          <div className="units">[{props.units.rain}]</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
