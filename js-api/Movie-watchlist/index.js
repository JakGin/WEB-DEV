const API_KEY = "1a5ffb62"

async function getMovies(movie) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`)
  const data = await res.json()
  if (data.Response === "False") {
    return "Movie Not Found"
  }
  return data.Search
}

async function getAdditionalMovieData(movie) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}&plot=short`)
  const data = await res.json()
  return data
}

function setMovieHtml(movies) {
  document.querySelector(".movies").innerHTML += `
    <div class="movie">
      <img class="poster" src="${movies.Poster}" />
      <header>
        <h2 class="movie-title">${movies.Title}</h2>
        <img src="img/star.svg" />
        ${movies.Rating}
      </header>
      <p class="run-time">${movies.Runtime}</p>
      <p class="genre">${movies.Genre}</p>
      <button class="add-btn">
        <img src="img/black-plus.svg" />
        <p>Watchlist</p>
      </button>
      <p class="plot">${movies.Plot}</p>
    </div>
  `
}

function filterMovies(movies) {
  return movies.filter(movie => movie.Poster !== "N/A")
}

function renderDefaultPage() {
  document.querySelector(".movies").innerHTML = `
  <div class="placeholder">
    <img src="img/placeholder.svg" alt="placeholder" width="200" height="200" />
    <p>Start exploring</p>
  </div>
  `
}

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault()
  document.querySelector(".movies").innerHTML = ""
  const movie = document.querySelector("form input").value
  if (movie === "") {
    renderDefaultPage()
    return
  }
  let data = await getMovies(movie)
  if (data !== "Movie Not Found") {
    data = filterMovies(data)
    data.forEach(async (movie) => {
      const additionalData = await getAdditionalMovieData(movie.Title)
      movie.Genre = additionalData.Genre
      movie.Runtime = additionalData.Runtime
      movie.Plot = additionalData.Plot
      movie.Rating = additionalData.Ratings[0]?.Value
      setMovieHtml(movie)
    })
    
  } else {
    document.querySelector(".movies").innerHTML = `
      <div class="movie-not-found"><p>Unable to find what you're looking for. Please try another search.</p></div>
    `
  }
})