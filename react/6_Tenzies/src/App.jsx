import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "/src/styles/styles.css";
import { addDoc } from "firebase/firestore";
import { winDataCollection } from "./firebase";

function App() {
  const nOfDices = 12;
  const { width, height } = useWindowSize();
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollsToWin, setRollsToWin] = React.useState(0);
  const [timeData, setTimeData] = React.useState({
    timerStart: 0,
    timeToWin: 0,
    bestTime: false
  });
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      tenzies={tenzies}
    />
  ));

  React.useEffect(() => {
    const isAllHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    setTenzies(isAllHeld && allSameValue);
  }, [dice]);

  React.useEffect(() => {
    if (tenzies) {
      setTimeData(prevTimeData => ({
        ...prevTimeData,
        timeToWin: Date.now() - prevTimeData.timerStart
      }))
    }
  }, [tenzies])

  React.useEffect(() => {
    if (tenzies && localStorage.getItem("bestTime")) {
      const currentRecord = JSON.parse(localStorage.getItem("bestTime"))
      if (timeData.timeToWin < currentRecord.timeToWin) {
        localStorage.setItem("bestTime", JSON.stringify({
          rollsToWin: rollsToWin, timeToWin: timeData.timeToWin, date: new Date(Date.now())
        }))
        setTimeData(prevTime => ({
          ...prevTime,
          bestTime: true,
        }))
      }
    } else if (tenzies) {
      localStorage.setItem("bestTime", JSON.stringify({
        rollsToWin: rollsToWin, timeToWin: timeData.timeToWin, date: new Date(Date.now())
      }))
    }

    if (tenzies) {
      addTimeToDatabase()
    }
  }, [timeData.timeToWin])

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
      setRollsToWin(0);
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie(die);
        })
      );
      if (rollsToWin === 0) {
        setTimeData({
          timerStart: Date.now(),
          timeToWin: 0,
          bestTime: false
        });
      }
      setRollsToWin((prevRolls) => prevRolls + 1);
    }

    timeData.bestTime = false;
  }

  function generateNewDie(prevDie) {
    let newDieValue = Math.ceil(Math.random() * 6)

    if (prevDie) {
      while(newDieValue === prevDie.value) {
        newDieValue = Math.ceil(Math.random() * 6)
      }
    }

    return {
      value: newDieValue,
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

  async function addTimeToDatabase() {
    await addDoc(winDataCollection, {
      rollsToWin: rollsToWin, timeToWin: timeData.timeToWin, date: new Date(Date.now())
    })
  }

  return (
    <div className="container">
      {tenzies && (
        <Confetti width={width - 4} height={height - 4} gravity={0.06} />
      )}
      <div>
        <h1 className="title">Tenzies</h1>
        {tenzies ? 
          <div className="score">
            <div>Rolls: {rollsToWin}</div>  
            <div>Time to win: {timeData.timeToWin / 1000}s</div>
          </div>
        :
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at it current value between rolls.</p>
        }
      </div>
      <div className="dice-container">{diceElements}</div>
      <button className="button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {timeData.bestTime && <div className="best-time">It's your best time!</div>}
    </div>
  );
}

export default App;
