const API_KEY = "1a5ffb62";
let moviesHtml = "";
let moviesData = [];

async function getMovies(movie) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`
  );
  const data = await res.json();
  if (data.Response === "False") {
    return "Movie Not Found";
  }
  return data.Search;
}

async function getAdditionalMovieData(movie) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}&plot=short`
  );
  const data = await res.json();
  return data;
}

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

function filterMovies(movies) {
  return movies.filter((movie) => movie.Poster !== "N/A");
}

function renderDefaultPage() {
  document.querySelector(".movies").innerHTML = `
  <div class="placeholder">
    <img src="img/placeholder.svg" alt="placeholder" width="200" height="200" />
    <p>Start exploring</p>
  </div>
  `;
}

function addButtonsListeners() {
  for (let index = 0; index < moviesData.length; index++) {
    const button = document.querySelector(`#movie-${index} .add-btn`);

    button.addEventListener("click", () => {
      let currentWatchlist = JSON.parse(localStorage.getItem("watchlist"));
      if (!currentWatchlist) {
        currentWatchlist = [];
        localStorage.setItem("watchlist", JSON.stringify(currentWatchlist));
      }
      const selectedMovie = moviesData.filter(
        (movie) => movie.index === index
      )[0];

      const check = currentWatchlist.filter(
        (movie) => movie.imdbID === selectedMovie.imdbID
      );

      if (check.length === 0) {
        currentWatchlist.push(selectedMovie);
      } else {
        currentWatchlist = currentWatchlist.filter(
          (movie) => movie.imdbID !== selectedMovie.imdbID
        );
      }
      localStorage.setItem("watchlist", JSON.stringify(currentWatchlist));

      if (check.length) {
        button.innerHTML = `
            <img src="img/black-plus.svg" />
            <p>Watchlist</p>
          `;
      } else {
        button.innerHTML = `
            <img src="img/black-minus.svg" />
            <p>Watchlist</p>
          `;
      }
    });
  }
}

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  document.querySelector(".movies").innerHTML = "";
  moviesHtml = "";
  moviesData = [];
  const movie = document.querySelector("form input").value;
  if (movie === "") {
    renderDefaultPage();
    return;
  }
  let data = await getMovies(movie);
  if (data !== "Movie Not Found") {
    data = filterMovies(data);
    data.forEach(async (movie, index) => {
      const additionalData = await getAdditionalMovieData(movie.Title);
      movie.Genre = additionalData.Genre;
      movie.Runtime = additionalData.Runtime;
      movie.Plot = additionalData.Plot;
      movie.Rating = additionalData.Ratings[0]?.Value;
      movie.index = index;
      moviesData.push(movie);
      setMovieHtml(movie, index);
    });
    setTimeout(() => {
      document.querySelector(".movies").innerHTML = moviesHtml;
      addButtonsListeners();
    }, 1000);
  } else {
    document.querySelector(".movies").innerHTML = `
      <div class="movie-not-found"><p>Unable to find what you're looking for. Please try another search.</p></div>
    `;
  }
});

export { setMovieHtml };
