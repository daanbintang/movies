const btnSearch = document.querySelector(".search-btn");
btnSearch.addEventListener("click", function () {
  // FOR SEARCH INPUT
  const user = document.querySelector(".input-user");
  fetch("http://www.omdbapi.com/?apikey=12137c7c&s=" + user.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cards = "";
      movies.forEach((movie) => (cards += showCards(movie)));
      const movSec = document.querySelector(".movies-section");
      movSec.innerHTML = cards;

      // FOR BUTTON SHOW DETAILS
      const details = document.querySelectorAll(".btn-details");
      details.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbID = this.dataset.imdbid;
          fetch(`http://www.omdbapi.com/?apikey=12137c7c&i=${imdbID}`)
            .then((response) => response.json())
            .then((movie) => {
              const modalBody = document.querySelector(".modal-body");
              let movieDetails = showDetails(movie);

              const modalHead = document.querySelector(".modal-header");

              modalHead.innerHTML = titleMovie(movie);
              modalBody.innerHTML = movieDetails;
            });
        });
      });
    });
});

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

function showDetails(movie) {
  return ` <div class="container-fluid border-3 border-primary">
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
