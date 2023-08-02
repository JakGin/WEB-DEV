API_KEY = "b24704deeedc85f30196afebaa806687"

async function setImage() {
  const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
  const data = await res.json()
  try {
    const image = data.urls.full
    let imageData = data.location.name
    if (! imageData) {
      imageData = `By: ${data.user.name}`
    }
    document.body.style.backgroundImage = `url(${image})`
    document.querySelector(".image-data").innerHTML = imageData
  } catch (error) {
    console.log("CATCH")
    document.body.style.backgroundImage = url("./placeholder-first-background.jpg")
  }
}

async function setCrypto() {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  if (! res.ok) {
    throw Error("Something went wrong")
  }
  const data = await res.json()
  try {
    const coinImage = data.image.small
    const usd = data.market_data.current_price.usd.toFixed(4)
    const lowUsd = data.market_data.low_24h.usd.toFixed(4)
    const highUsd = data.market_data.high_24h.usd.toFixed(4)
    
    document.querySelector(".crypto").innerHTML = `
      <div class="crypto-header">
        <img src="${coinImage}" />
        <h2>Dogecoin</h2>
      </div>
      <p>🎯 $${usd}</p>
      <p>☝️ $${highUsd}</p>
      <p>👇 $${lowUsd}</p>
    `
  } catch (error) {
    console.log(error)
  }
}

function setTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-us", {timeStyle: "medium"})

  document.querySelector(".time").textContent = currentTime
}

function setWeather() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      if (!res.ok) {
        throw Error("Weather data not available")
      }
      const data = await res.json()
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      document.querySelector(".weather").innerHTML = `
          <p>${data.name}</p>
          <div class="icon-temp-container">
            <img src=${iconUrl} />
            <p class="temp">${Math.round(data.main.temp)}º</p>
          </div>
          <p>humidity: ${data.main.humidity}</p>
      `
    } catch (error) {
      console.log(error)
    }
  });
}



setImage()
setCrypto()
setWeather()
setTime()
setInterval(setTime, 1000)
setInterval(setWeather, 60000)