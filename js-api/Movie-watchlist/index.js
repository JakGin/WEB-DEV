const API_KEY = "1a5ffb62a"

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

function setMoviesHtml(movies) {
  document.querySelector(".movies").innerHTML = `
    <div class="movie">${movies}</div>
  `
}

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault()
  const movie = document.querySelector("form input").value
  data = await getMovies(movie)
  if (data !== "Movie Not Found") {
    data.forEach(async (movie) => {
      const additionalData = await getAdditionalMovieData(movie.Title)
      movie.Genre = additionalData.Genre
      movie.Runtime = additionalData.Runtime
      movie.Plot = additionalData.Plot
      movie.Rating = additionalData.Ratings[0]?.Value
    })
    setMoviesHtml(data)
  } else {
    document.querySelector(".movies").innerHTML = `
      <div class="movie-not-found"><p>Unable to find what you're looking for. Please try another search.</p></div>
    `
  }
})