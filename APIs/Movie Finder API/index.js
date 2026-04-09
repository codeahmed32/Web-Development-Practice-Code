function getMovies() {
    const inputMovieRef = document.querySelector("#searchMovie");
    const displayResultRef = document.querySelector("#displayContent");

    const readData = inputMovieRef.value;
    
    // 1. Clear previous results so they don't just stack up forever
    displayResultRef.innerHTML = "";

    fetch(`https://www.omdbapi.com/?apikey=97ee378&s=${readData}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // 2. Safety Check: OMDB returns "Response: False" if no movies are found
            if (data.Response === "True") {
                data.Search.map((movie) => {
                    // Create the elements
                    const movieCard = document.createElement("div");
                    const title = document.createElement("h2");
                    const poster = document.createElement("img");

                    // Set content
                    title.textContent = movie.Title;
                    poster.src = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Poster";
                    poster.style.width = "200px";

                    // 3. Assemble and Append
                    movieCard.appendChild(poster);
                    movieCard.appendChild(title);
                    displayResultRef.appendChild(movieCard);
                });
            } else {
                displayResultRef.textContent = "No movies found!";
            }
            
            // Return data if you want to use it in the next .then()
            return data;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}