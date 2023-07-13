import React from "react";
import "/src/styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <img
        src="images/photo-grid.png"
        alt="photo"
        width="300"
        className="hero--photo"
      />
      <h1 className="hero--header">Online Experiences</h1>
      <p className="hero--text">
        Join unique interactive activities led by one-of-a-kind hosts-all
        without leaving home
      </p>
    </section>
  );
}

export default Hero;
