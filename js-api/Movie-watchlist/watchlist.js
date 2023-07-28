// import { setMovieHtml } from "./index.js";

let moviesHtml = ""

function setMovieHtml(movie, index) {
  let addBtnIcon = "";

  let currentWatchlist = JSON.parse(localStorage.getItem("watchlist"));
  if (!currentWatchlist) {
    addBtnIcon = "img/black-plus.svg";
  } else {
    const check = currentWatchlist.filter((mv) => mv.imdbID === movie.imdbID);
    if (check.length === 0) {
      addBtnIcon = "img/black-plus.svg";
    } else {
      addBtnIcon = "img/black-minus.svg";
    }
  }

  moviesHtml += `
    <div class="movie" id="movie-${index}">
      <img class="poster" src="${movie.Poster}" />
      <header>
        <h2 class="movie-title">${movie.Title}</h2>
        <img src="img/star.svg" />
        ${movie.Rating}
      </header>
      <p class="run-time">${movie.Runtime}</p>
      <p class="genre">${movie.Genre}</p>
      <button class="add-btn">
        <img src="${addBtnIcon}" />
        <p>Watchlist</p>
      </button>
      <p class="plot">${movie.Plot}</p>
    </div>
  `;
}

function addButtonsListeners(movies) {
  movies.forEach((movie) => {
    const button = document.querySelector(`#movie-${movie.index} .add-btn`);

    button.addEventListener("click", () => {
      const newMovies = movies.filter((mv) => mv.imdbID !== movie.imdbID);
      localStorage.setItem("watchlist", JSON.stringify(newMovies));
      renderPage();
    });
  });
}

function renderDefaultPage() {
  document.querySelector(".movies").innerHTML = `
  <div class="placeholder-watchlist">
      <p>Your watchlist is looking a little empty...</p>
      <a href="index.html" class="watchlist-add-movies">
        <img src="img/black-plus.svg" alt="add-icon">
        <p>Let's add some movies!</p>
      </a>
    </div>
  `;
}

function renderPage() {
  const movies = JSON.parse(localStorage.getItem("watchlist"));
  if (movies.length === 0) {
    renderDefaultPage();
    return
  }
  moviesHtml = ""
  movies.forEach((movie) => {
    setMovieHtml(movie, movie.index);
  });
  document.querySelector(".movies").innerHTML = moviesHtml;
  addButtonsListeners(movies);
}

renderPage();
