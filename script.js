async function searchMovie() {
  const title = document.getElementById("movieInput").value.trim();
  const detailsDiv = document.getElementById("movieDetails");
  detailsDiv.innerHTML = "";
  detailsDiv.classList.add("hidden");

  if (!title) {
    alert("Please enter a movie name.");
    return;
  }

  const apiKey = "c580c373";
  const searchUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${apiKey}`;

  try {
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.Response === "False") {
      detailsDiv.innerHTML = `<p class="text-red-500 font-semibold">${data.Error}</p>`;
    } else {
      const movies = data.Search;

      // Fetch full details for each movie using imdbID
      const detailedMovies = await Promise.all(
        movies.map(async (movie) => {
          const detailRes = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
          return await detailRes.json();
        })
      );

      const movieCards = detailedMovies.map(movie => `
        <div class="flex flex-col md:flex-row gap-4 p-4 border rounded shadow mb-6 bg-white">
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/100x150?text=No+Image"}"
               alt="${movie.Title}" class="w-32 h-48 object-cover rounded">
          <div>
            <h3 class="text-2xl font-bold mb-1">${movie.Title} (${movie.Year})</h3>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>IMDB Rating:</strong> ⭐ ${movie.imdbRating}</p>
            <p class="mt-2 text-gray-700"><strong>Plot:</strong> ${movie.Plot}</p>
          </div>
        </div>
      `).join("");

      detailsDiv.innerHTML = `<div class="flex flex-col">${movieCards}</div>`;
    }

    detailsDiv.classList.remove("hidden");
  } catch (error) {
    detailsDiv.innerHTML = `<p class="text-red-500 font-semibold">Failed to fetch data. Try again later.</p>`;
    detailsDiv.classList.remove("hidden");
  }
}
