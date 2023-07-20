import React from "react";
import Die from "./components/Die";

function App() {
  const nOfDices = 10;
  const [dice, setDice] = React.useState(allNewDice())
  const diceElements = dice.map(die => (
    <Die number={die} />
  ))

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < nOfDices; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  function rollDice() {
    setDice(allNewDice())
  }

  return (
    <div className="container">
      {/* <Header /> */}
      <div className="dice-container">
        {diceElements}
      </div>
      <div className="button" onClick={rollDice}>Roll</div>
    </div>
  );
}

export default App;
