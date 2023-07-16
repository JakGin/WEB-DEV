import React from "react"
import "/src/styles/Main.css"
import Card from "./Card"

function Main() {
  const [weatherData, setWeatherData] = React.useState([])

  const cards = weatherData.map(dayData => {
    <Card 
      day={dayData.date}
      temperature={dayData.temperature}
      wind={dayData.wind}
      rain={dayData.rain}
    />
  })

  React.useEffect(() => {
    async function getWeatherData() {
      const res = await fetch(
          ``
        );
        const data = await res.json();
        // setWeatherData  
    }

    getWeatherData()
  }, [])

  return (
    <main className="main">
      {cards}
    </main>
  )
}

export default Main