const loadMoviesButton = document.getElementById("loadMovies");
const moviesOutput = document.getElementById("movies");
const moviesForm = document.getElementById("moviesForm");
const moviesIdInput = document.getElementById("moviesId");
const moviesResult = document.getElementById("moviesResult");

const displayMovie = ({ id, title, year }) => `
<article class="movie">
  <h3>${title}</h3>
  <p><strong>ID:</strong> ${id}</p>
  <p>Release Year: ${year}</p>
</article>
`;

loadMoviesButton.addEventListener("click", async () => {
  const response = await fetch("/api/movies");
  const movies = await response.json();

  moviesOutput.innerHTML = movies.map((movie) => displayMovie(movie)).join("");
});

moviesForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const movieId = moviesIdInput.value;
  const response = await fetch(`/api/movies/${movieId}`);
  const data = await response.json();

  if (!response.ok) {
    moviesResult.innerHTML = `"<p class='error'>${data.message}</p>"`;
    return;
  } else {
    moviesResult.innerHTML = displayMovie(data);
  }
});
