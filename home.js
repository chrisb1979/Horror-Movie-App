const main = document.querySelector('.main');


fetch(genreListURL + new URLSearchParams({
    api_key: apiKeyTMDB
}))
    .then(res => res.json())
    .then(data => {
        data.genres.forEach(item => {
            moviesList(item.id, item.name);
        })
    });


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


const movieCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    data.forEach((item, slider) => {
        if (item.backdrop_path == null) {
            item.backdrop_path = item.poster_path;
            if (item.backdrop_path == null) {
                return;
            }
        }

        
        movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${imageURL}${item.backdrop_path}" alt="Movie Poster">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

        
        const scrollBar = () => {
            const container = [...document.querySelectorAll('.movie-container')];
            const nextBtn = [...document.querySelectorAll('.next-btn')];
            const previousBtn = [...document.querySelectorAll('.previous-btn')];

           
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
      
        if (slider == data.length - 1) {
            setTimeout(() => {
                scrollBar();
            });
        }
    })
}