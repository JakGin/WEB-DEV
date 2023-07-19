import React from "react";
import "/src/styles/Main.css";
import Card from "./Card";

function Main( {location }) {
  const [daysDisplayed, setDaysDisplayed] = React.useState(7);
  const [weatherData, setWeatherData] = React.useState([]);

  const cards = weatherData.map((dayData) => {
    return <Card {...dayData} />;
  });

  function formatData(data) {
    let formated_data = [...data];

    for (let i = 0; i < daysDisplayed; i++) {
      formated_data[i].date = formated_data[i].date
        .split("-")
        .reverse()
        .join("-");
      formated_data[i].temperature = formated_data[i].temperature.toFixed(1);
      formated_data[i].wind = formated_data[i].wind.toFixed(1);
      formated_data[i].rain =
        formated_data[i].rain === 0 ? 0 : formated_data[i].rain.toFixed(1);
    }

    return formated_data;
  }

  function initWeatherData(data) {
    let weatherData = [];

    for (let i = 0; i < daysDisplayed; i++) {
      weatherData.push({
        key: i,
        date: data.daily.time[i],
        temperature: data.daily.temperature_2m_max[i],
        wind: data.daily.windspeed_10m_max[i],
        rain: data.daily.rain_sum[i],
        units: {
          temperature: data.daily_units.temperature_2m_max,
          wind: data.daily_units.windspeed_10m_max,
          rain: data.daily_units.rain_sum,
        },
      });
    }

    return formatData(weatherData);
  }

  React.useEffect(() => {
    async function getWeatherData() {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longtitude}&daily=temperature_2m_max,sunrise,sunset,rain_sum,windspeed_10m_max&timezone=auto`
      );
      const data = await res.json();
      setWeatherData(initWeatherData(data));
    }

    getWeatherData();
  }, [location]);

  return <main className="main">{cards}</main>;
}

export default Main;
