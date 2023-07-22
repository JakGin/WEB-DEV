import React from "react";
import Start from "./components/Start";
import MainGame from "./components/MainGame";

export default function App() {
  const [activeWindow, setActiveWindow] = React.useState("startWindow");
  const [questionsParameters, setQuestionsParameters] = React.useState({
    numberOfQuestions: 5,
    level: "any",
    questionType: "any",
  });

  return (
    <>
      {activeWindow === "startWindow" ? (
        <Start
          setActiveWindow={setActiveWindow}
          questionsParameters={questionsParameters}
          setQuestionsParameters={setQuestionsParameters}
        />
      ) : (
        <MainGame
          setActiveWindow={setActiveWindow}
          questionsParameters={questionsParameters}
        />
      )}
    </>
  );
}
