import { InterfaceMovieSearch } from './interfaces.mjs';
import { LAZY_LOADER } from './observer.mjs';

export const insertMovies = (
	movies: InterfaceMovieSearch[], container: HTMLElement, carousel: boolean,
	{
		clean = true
	} = {}) => {

	if (clean)
		container.innerHTML = '';


	for (const MOVIE of movies) {
		const ARTICLE = document.createElement('article');
		const MOVIE_IMG = `https://image.tmdb.org/t/p/w300${MOVIE.poster_path}`;
		const ALT_IMG = MOVIE.title;
		const FIGURE = document.createElement('figure');
		const IMG = document.createElement('img');
		const LIKED_BUTTON = document.createElement('button') as HTMLButtonElement;

		LIKED_BUTTON.className = 'material-icons liked-movie__button';
		LIKED_BUTTON.innerText = 'favorite_border';
		LIKED_BUTTON.addEventListener('click', () => {
			LIKED_BUTTON.classList.toggle('liked-movie__button--liked');

			const IS_LIKED = LIKED_BUTTON.classList.contains('liked-movie__button--liked');

			LIKED_BUTTON.innerText = (IS_LIKED)
				? 'favorite'
				: 'favorite_border';
		});

		const DATA_CONTAINER = `
			<div id="liked-movie__data-id-${counterMovies}" class="liked-movie__data">
				<div class="liked-movie__data-container">
					<div>
						<h3 class="liked-movie__title">${MOVIE.title}</h3>
						<div>
							<div class="liked-movie__info-movie-container">
								<p class="material-icons">star</p>
								<p>${MOVIE.vote_average.toFixed(2)}</p>
							</div>
							<p>${MOVIE.release_date.split('-')[0]}</p>
						</div>
					</div>
				</div>
			</div>`
		;

		ARTICLE.classList.add('generic-list__movie-container');
		IMG.className = (carousel)
			? 'generic-list__img-carousel'
			: 'generic-list__img';

		IMG.addEventListener('error', () => {
			IMG.src = `https://via.placeholder.com/300x450/5c218a/ffffff?text=sorry :(`;
		});

		if (carousel)
			ARTICLE.setAttribute('class', 'carousel__item generic-list__movie-container');

		LAZY_LOADER.observe(IMG);
		IMG.setAttribute('data-alt-img', ALT_IMG);
		IMG.setAttribute('data-src-img', MOVIE_IMG);

		FIGURE.append(IMG);
		ARTICLE.innerHTML += DATA_CONTAINER;
		ARTICLE.append(FIGURE, LIKED_BUTTON);
		container.appendChild(ARTICLE);

		const INFO_MOVIE_CONTAINER = document.querySelector(`#liked-movie__data-id-${counterMovies}`) as HTMLElement;

		INFO_MOVIE_CONTAINER.addEventListener('click', () => showMovieDetails(MOVIE.id));
		counterMovies++;
	}


	// if (!carousel && clean && !IsButtonLoadMore) {
	// 	const BUTTON_LOAD_MORE = document.createElement('button') as HTMLButtonElement;

	// 	BUTTON_LOAD_MORE.innerText = 'CARGAR MÁS';
	// 	BUTTON_LOAD_MORE.className = 'generic-list__button main__button-see-more';
	// 	BUTTON_LOAD_MORE.addEventListener('click', getPaginatedTrendingMovies);
	// 	GENERIC_LIST.appendChild(BUTTON_LOAD_MORE);
	// 	IsButtonLoadMore = true;
	// }
};
// const IsButtonLoadMore = false;

const showMovieDetails = (id: number) => {
	location.hash = `#movie=${id}`;
};

let counterMovies = 0;
