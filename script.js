const apiKey = '2107617b4be3aeb6cda039aff905ce64';
const baseUrl = 'https://api.themoviedb.org/3';
const imageUrl = 'https://image.tmdb.org/t/p/w500';

const nowPlayingBtn = document.getElementById('now-playing');
const popularBtn = document.getElementById('popular');
const topRatedBtn = document.getElementById('top-rated');
const upcomingBtn = document.getElementById('upcoming');
const moviesContainer = document.getElementById('movies-container');

// Function to fetch and display movies
const fetchMovies = (endpoint) => {
    fetch(`${baseUrl}/movie/${endpoint}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.error('Error fetching data:', error));
};

// Function to display movies in the container
const displayMovies = (movies) => {
    moviesContainer.innerHTML = ''; // Clear previous movies

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${imageUrl}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
            <p>Release Date: ${movie.release_date}</p>
        `;

        moviesContainer.appendChild(movieCard);
    });
};

// Event listeners for buttons
nowPlayingBtn.addEventListener('click', () => fetchMovies('now_playing'));
popularBtn.addEventListener('click', () => fetchMovies('popular'));
topRatedBtn.addEventListener('click', () => fetchMovies('top_rated'));
upcomingBtn.addEventListener('click', () => fetchMovies('upcoming'));

// Fetch and display "Now Playing" movies by default when the page loads
window.onload = () => fetchMovies('now_playing');

const randomMovieBtn = document.getElementById('random-movie');

// Function to fetch and display a random movie from the discover endpoint
const fetchRandomMovie = () => {
    // Discover endpoint with adult=false and a random page
    const randomPage = Math.floor(Math.random() * 500) + 1; // Random page between 1 and 500
    fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&include_adult=false&page=${randomPage}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
                displayRandomMovie(randomMovie);
            } else {
                throw new Error('No movies found on this page, retrying...');
            }
        })
        .catch(error => {
            console.error('Error fetching random movie:', error);
            fetchRandomMovie(); // Retry on failure
        });
};

// Function to display the random movie card
const displayRandomMovie = (movie) => {
    moviesContainer.innerHTML = ''; // Clear previous movies

    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
        <img src="${imageUrl}${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Rating: ${movie.vote_average}</p>
        <p>Release Date: ${movie.release_date}</p>
        <p>${movie.overview}</p>
    `;

    moviesContainer.appendChild(movieCard);
};

// Event listener for the "Get Random Movie" button
randomMovieBtn.addEventListener('click', fetchRandomMovie);
