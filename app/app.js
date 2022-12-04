// KETIKA TOMBOL SEARCH DI CLICK
const btn = document.querySelector(".search-btn");
btn.addEventListener("click", async function () {
  try {
    // TANGKAP ELEMENT INPUT PENCARIAN
    const user = document.querySelector(".input-user");
    // MOVIES BERISI DATA FILM YANG DI CARI OLEH USER
    const movies = await getMovies(user.value);
    // JIKA DATA YANG DI CARI SUDAH DI DAPAT MAKA TAMPILKAN DATA KE MOVIE SECTION
    updateUI(movies);
  } catch (err) {
    notFound(); 
  }
});

// MENGABIL DATA FILM DARI API
function getMovies(value) {
  return fetch("http://www.omdbapi.com/?apikey=12137c7c&s=" + value)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error();
      }
      return response.Search;
    });
}

// MENAMPILKAN TAMPILAN UNTUK MOVIE LIST
function updateUI(movies) {
  let cards = "";
  movies.forEach((movie) => (cards += showCards(movie)));
  const movSec = document.querySelector(".movies-section");
  movSec.innerHTML = cards;
}

// KETIKA MOVIE TIDAK DI TEMUKAN
function notFound() {
  const alertNotFound = `
  <div id="alert" class="alert alert-primary alert-dismissible fade show ms-" role="alert">
    <strong>Movie Not Found!</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  const sec = document.getElementById("sec-not-found");
  sec.innerHTML = alertNotFound;
}

// KETIKA TOMBOL SHOWDETAIL DI CLICK
// EVENT BINDING
document.addEventListener("click",async function (e) {
  try {
      if (e.target.classList.contains("btn-details")) {
        const imdbID = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbID);
        updateUIDetail(movieDetail);
      }
  } catch (err) {
    console.log(err);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=12137c7c&i=" + imdbid)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((movie) => movie);
}

function updateUIDetail(movie) {
  const modalBody = document.querySelector(".modal-body");
    let movieDetails = showDetails(movie);
    const modalHead = document.querySelector(".modal-header");
    modalHead.innerHTML = titleMovie(movie);
    modalBody.innerHTML = movieDetails;
}

// MENAMPILKAN HTML UNTUK CARDS
function showCards(movie) {
  return ` 
        <div class="col-sm-6 col-md-4 col-lg-3 my-5 cards">
            <div class="card border border-primary border-5 rounded-4 overflow-hidden">
                <img
                src="${movie.Poster}"
                  class="card-img-top"
                  height="400px"
                />
                <div class="card-body fw-bolder">
                <a href="#" class="btn btn-primary btn-details"
                  data-bs-toggle="modal"
                  data-bs-target="#data-movie"
                  data-imdbid="${movie.imdbID}"
                >Show Details</a>
                </div>
            </div>
        </div>`;
}

// MENAMPILKAN DATA DI MODAL BODY
function showDetails(movie) {
  return `
  <div class="container-fluid border-3 border-primary">
    <div class="row">
      <div class="col-lg-6">
        <img src="${movie.Poster}" class="img-fluid card-img-top overflow-hidden border border-3 border-primary" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><strong>Director:</strong><br>${movie.Director}</li>
          <li class="list-group-item"><strong>Writer:</strong><br>${movie.Writer}</li>
          <li class="list-group-item"><strong>Actors:</strong><br>${movie.Actors}</li>
          <li class="list-group-item"><strong>Genre:</strong><br>${movie.Genre}</li>
          <li class="list-group-item"><strong>Plot:</strong><br>${movie.Plot}</li>
          <li class="list-group-item"><strong>Relased:</strong><br>${movie.Released}</li>
        </ul>
      </div>
    </div>
  </div>`;
}

function titleMovie(movie) {
  return `
  <h1 class="modal-title fs-5" id="modal-title">
    ${movie.Title}</h1>
            <button
              type="button"
              class="btn-close bg-danger text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>`;
}
