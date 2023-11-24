const main = document.querySelector('.main');

// Fetch movie data from the API and convert to JSON
fetch(genreListURL + new URLSearchParams({
    api_key: apiKeyTMDB
}))
    .then(res => res.json())
    .then(data => {
        data.genres.forEach(item => {
            moviesList(item.id, item.name);
        })
    });

// Fetch movies from TMDB by Genre and ID
const moviesList = (id, genres) => {
    fetch(movieGenreURL + new URLSearchParams({
        api_key: apiKeyTMDB,
        with_genres: id
    }))
        .then(res => res.json())
        .then(data => {
            makeCategoryElement(`${genres}`, data.results);
        })
        .catch(err => console.log(err));
}

// Bring in 'main' from the HTML and add movies and button images
const makeCategoryElement = (category, data) => {
    main.innerHTML += `
<div class="movie-list">
    <button class="previous-btn"><img src="img/previous-movie.png" alt="Previous Movie"></button>
    <h1 class="movie-category">${category}</h1>
    <div class="movie-container" id="${category}">
    </div>
    <button class="next-btn"><img src="img/next-movie.png" alt="Next Movie"></button>
</div>
`;
    movieCards(category, data);
}

/* Check to make sure the image is received from TMDB. Per their documentation, tt uses both 'backdrop_path' and 'poster_path'
for some stupid reason. Check for both and skip if neither is found */
const movieCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    data.forEach((item, slider) => {
        if (item.backdrop_path == null) {
            item.backdrop_path = item.poster_path;
            if (item.backdrop_path == null) {
                return;
            }
        }

        /* Pull in the images from TMDB and show movie names beneath the container
           On click, take the user to the about page */
        movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${imageURL}${item.backdrop_path}" alt="Movie Poster">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

        // Target the 'movie-container' holding all the movie images and add scrolling and buttons
        const scrollBar = () => {
            const container = [...document.querySelectorAll('.movie-container')];
            const nextBtn = [...document.querySelectorAll('.next-btn')];
            const previousBtn = [...document.querySelectorAll('.previous-btn')];

            // Use getBoundingClientRect to return the containers dimensions for manipulation
            container.forEach((item, i) => {
                let containerDimensions = item.getBoundingClientRect();
                let containerWidth = containerDimensions.width;

                nextBtn[i].addEventListener('click', () => {
                    item.scrollLeft += containerWidth;
                })

                previousBtn[i].addEventListener('click', () => {
                    item.scrollLeft -= containerWidth;
                })
            })
        }
        // Movie card slider, will stop the scrolling function once the end of the array is reached
        if (slider == data.length - 1) {
            setTimeout(() => {
                scrollBar();
            });
        }
    })
}