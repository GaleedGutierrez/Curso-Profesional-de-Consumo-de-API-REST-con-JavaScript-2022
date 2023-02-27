import { MovieSearchInterface } from './interfaces.mjs';
import { LAZY_LOADER } from './observer.mjs';

export const insertMovies = (
	movies: MovieSearchInterface[], container: HTMLElement, carousel: boolean,
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

		FIGURE.append(IMG);
		ARTICLE.append(FIGURE);
		ARTICLE.addEventListener('click', () => showMovieDetails(MOVIE.id));

		IMG.className = (carousel)
			? 'generic-list__img-carousel'
			: 'generic-list__img';

		IMG.addEventListener('error', () => {
			IMG.src = `https://via.placeholder.com/300x450/5c218a/ffffff?text=sorry :(`;
		});

		if (carousel)
			ARTICLE.setAttribute('class', 'carousel__item');

		LAZY_LOADER.observe(IMG);
		IMG.setAttribute('data-alt-img', ALT_IMG);
		IMG.setAttribute('data-src-img', MOVIE_IMG);

		container.appendChild(ARTICLE);
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

