import React from "react";
import Die from "./components/Die";

function App() {
  return (
    <div className="container">
      {/* <Header /> */}
      <div className="dies">
        <Die number={2} />
        <Die number={4} />
        <Die number={6} />
        <Die number={4} />
        <Die number={1} />
        <Die number={3} />
        <Die number={4} />
        <Die number={4} />
        <Die number={4} />
        <Die number={2} />
      </div>
    </div>
  );
}

export default App;
