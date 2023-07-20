import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

function App() {
  const nOfDices = 10;
  const [dice, setDice] = React.useState(allNewDice());
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < nOfDices; i++) {
      newDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return newDice;
  }

  function rollDice() {
    setDice(allNewDice());
  }

  function holdDice(id) {
    setDice(prevDice => dice.map(die => ({
      ...die,
      isHeld: die.id === id ? !die.isHeld : die.isHeld
    })))
  }

  return (
    <div className="container">
      {/* <Header /> */}
      <div className="dice-container">{diceElements}</div>
      <button className="button" onClick={rollDice}>
        Roll
      </button>
    </div>
  );
}

export default App;
