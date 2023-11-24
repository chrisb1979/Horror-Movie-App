let movie_id = location.pathname;

// Fetch movie details from TMDB.org API
fetch(`${movieDetails}${movie_id}?` + new URLSearchParams({
    api_key: apiKeyTMDB
}))
    .then(res => res.json())
    .then(data => {
        movieHeroInfo(data);
    })

const movieHeroInfo = (data) => {
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.movie-genres');
    const description = document.querySelector('.movie-description');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.movie-info-container');

    title.innerHTML = movieName.innerHTML = data.title;
    genres.innerHTML = `${data.release_date.split('-')[0]}: `;
    for (let i = 0; i < data.genres.length; i++) {
        genres.innerHTML += data.genres[i].name + formatString(i, data.genres.length);
    }

    if (data.backdrop_path == null) {
        data.backdrop_path = data.poster_path;
    }

    description.innerHTML = data.overview;

    backdrop.style.backgroundImage = `url(${hiresImageURL}${data.backdrop_path})`;
}

// Adds a comma after a genre if there are more to be listed, adds nothing if it's finished
const formatString = (currentIndex, maxIndex) => {
    return (currentIndex == maxIndex - 1) ? '' : ', ';
}

// Fetch movie cast info from TMDB.org API
fetch(`${movieDetails}${movie_id}/credits?` + new URLSearchParams({
    api_key: apiKeyTMDB
}))
    .then(res => res.json())
    .then(data => {
        const cast = document.querySelector('.starring');
        for (let i = 0; i < 4; i++) {
            cast.innerHTML += data.cast[i].name + formatString(i, 4);
        }
    })

// Fetch movie trailers from TMDB.org API
fetch(`${movieDetails}${movie_id}/videos?` + new URLSearchParams({
    api_key: apiKeyTMDB
}))
    .then(res => res.json())
    .then(data => {
        let trailerContainer = document.querySelector('.trailer-container');
        let maxClips = (data.results.length > 3) ? 3 : data.results.length;
        // Use code from youtube to imbed the videos
        for (let i = 0; i < maxClips; i++) {
            trailerContainer.innerHTML += `
        <iframe src="https://youtube.com/embed/${data.results[i].key}"
        title="YouTube video player" frameborder="0" allow="accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope; 
        picture-in-picture; web-share" allowfullscreen></iframe>
        `;
        }
    })

// Fetch movie recommendations from TMDB.org API
fetch(`${movieDetails}${movie_id}/recommendations?` + new URLSearchParams({
    api_key: apiKeyTMDB
}))
    .then(res => res.json())
    .then(data => {
        let recommendationsContainer = document.querySelector('.recommendations-container');
        for (let i = 0; i < 5; i++) {
            if (data.results[i].backdrop_path == null) {
                i++;
            }
            recommendationsContainer.innerHTML += `
            <div class="movie" onclick="location.href = '/${data.results[i].id}'">
            <img src="${imageURL}${data.results[i].backdrop_path}" alt="">
            <p class="movie-title">${data.results[i].title}</p>
            </div>
            `;
        }
    })