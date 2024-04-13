document.addEventListener('DOMContentLoaded', loadMovies);

async function loadMovies() {
    try {
        const moviesResponse = await fetch('https://macsmith21.github.io/CSCE242/project/jsonFiles/movies.json');
        const moviesData = await moviesResponse.json();
        renderMovies(moviesData);
    } catch (fetchError) {
        console.error('Error fetching house movies:', fetchError);
    }
}

function renderMovies(movies) {
    const moviesContainer = document.getElementById('top5');
    moviesContainer.innerHTML = ''; // Clear existing content
    movies.forEach(movie => {
        const movieContainer = document.createElement('section');
        movieContainer.className = 'row';

        const movieImage = document.createElement('img');
        movieImage.src = movie.image;
        movieImage.alt = movie.title;

        const movieDetails = document.createElement('section');
        const movieList = document.createElement('ul');
        movieList.className = 'descs';

        const titleItem = document.createElement('li');
        titleItem.textContent = `Title: ${movie.title}`;
        movieList.appendChild(titleItem);

        const directorItem = document.createElement('li');
        directorItem.textContent = `Director: ${movie.Director}`;
        movieList.appendChild(directorItem);

        const genreItem = document.createElement('li');
        genreItem.textContent = `Genre: ${movie.Genre}`;
        movieList.appendChild(genreItem);

        const yearItem = document.createElement('li');
        yearItem.textContent = `Year: ${movie.Year}`;
        movieList.appendChild(yearItem);

        // Append elements to the DOM
        movieDetails.appendChild(movieList);
        movieContainer.appendChild(movieImage);
        movieContainer.appendChild(movieDetails);
        moviesContainer.appendChild(movieContainer);
    });
}








const Hamburger = () =>{
    let burg = document.getElementById("main-nav");
    burg.classList.toggle("hide");
}

window.onload = () => {
    document.getElementById("hamburger").onclick = Hamburger;
}
