async function searchMovie() {
  const title = document.getElementById("movieInput").value.trim();
  const detailsDiv = document.getElementById("movieDetails");
  detailsDiv.innerHTML = "";
  detailsDiv.classList.add("hidden");

  if (!title) {
    alert("Please enter a movie name.");
    return;
  }

  const apiKey = "c580c373"; // 🔁 Replace with your actual OMDb API key
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      detailsDiv.innerHTML = `<p class="text-red-500 font-semibold">${data.Error}</p>`;
    } else {
      detailsDiv.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6">
          <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x450?text=No+Image"}"
               alt="${data.Title}" class="w-full md:w-1/3 rounded shadow">
          <div>
            <h2 class="text-2xl font-bold mb-2">${data.Title} (${data.Year})</h2>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <p><strong>IMDB Rating:</strong> ⭐ ${data.imdbRating}</p>
            <p class="mt-2 text-gray-700"><strong>Plot:</strong> ${data.Plot}</p>
          </div>
        </div>
      `;
    }

    detailsDiv.classList.remove("hidden");
  } catch (error) {
    detailsDiv.innerHTML = `<p class="text-red-500 font-semibold">Failed to fetch data. Try again later.</p>`;
    detailsDiv.classList.remove("hidden");
  }
}
