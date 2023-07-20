import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "/src/styles/styles.css";

function App() {
  const nOfDices = 10;
  const { width, height } = useWindowSize();
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  React.useEffect(() => {
    const isAllHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    setTenzies(isAllHeld && allSameValue);
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < nOfDices; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    }
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <div className="container">
      {tenzies && (
        <Confetti width={width - 4} height={height - 4} gravity={0.06} />
      )}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
