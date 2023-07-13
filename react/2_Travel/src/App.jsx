import React from "react";
import Nav from "./components/Nav";
import Card from "./components/Card";
import data from "./data";
import "./styles/app.css";

function App() {
  const cards = data.map((item) => {
    return <Card {...item} />;
  });

  return (
    <>
      <Nav />
      <section className="cards">
        {cards}
      </section>
    </>
  );
}

export default App;
