import React from "react";
import Start from "./components/Start";
import MainGame from "./components/MainGame";

export default function App() {
  const [activeWindow, setActiveWindow] = React.useState("startWindow");

  return (
    <>
      {activeWindow === "startWindow" ? (
        <Start setActiveWindow={setActiveWindow} />
        ) : (
          <MainGame />
      )}
    </>
  );
}
