import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

function App() {
  const [darkMode, setDarkMode] = React.useState(true);

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  React.useEffect(() => {
    if (darkMode) {
      document.querySelector("body").style.backgroundColor = "#282d35"
    } else {
      document.querySelector("body").style.backgroundColor = "white"
    }
  })

  return (
    <div className={darkMode ? "container dark-c" : "container"}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Main darkMode={darkMode} />
    </div>
  );
}

export default App;
