import { getLikedMovieListFromLocalStorage } from './getData.mjs';
import { InterfaceMovieSearch } from './interfaces.mjs';
import { amountLikedMovies, showLikedMovieSection, showMovieDetails } from './navigation.js';
import { LIKED_MOVIE_SECTION } from './nodes.mjs';
import { LAZY_LOADER } from './observer.mjs';
import { setLikeMovieOnLocalStorage } from './setData.mjs';

export const insertMovies = (
	movies: InterfaceMovieSearch[], container: HTMLElement, carousel: boolean,
	{
		clean = true
	} = {}): void => {

	if (clean)
		container.innerHTML = '';


	for (const MOVIE of movies) {
		createMovieBox(MOVIE, container, carousel);
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

const createMovieBox = (movie: InterfaceMovieSearch, container: HTMLElement, carousel: boolean): void => {
	// Create elements DOM
	const ARTICLE = document.createElement('article') as HTMLElement;
	const FIGURE = document.createElement('figure') as HTMLElement;
	const IMG = document.createElement('img') as HTMLImageElement;
	const LIKED_BUTTON = document.createElement('button') as HTMLButtonElement;
	const DATA_CONTAINER = document.createElement('div') as HTMLDivElement;

	// Data box movie
	const ID = movie.id;
	const TITLE = movie.title;
	const MOVIE_IMG = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
	const ALT_IMG = movie.title;
	const AGE = movie.release_date.split('-')[0];
	const VOTES = movie.vote_average.toFixed(2);

	// general variables
	const IS_LIKED = getLikedMovieListFromLocalStorage()[ID];

	// Add attributes
	ARTICLE.className = (carousel)
		? 'carousel__item generic-list__movie-container'
		: 'generic-list__movie-container';
	IMG.className = (carousel)
		? 'generic-list__img-carousel'
		: 'generic-list__img';
	IMG.setAttribute('data-alt-img', ALT_IMG);
	IMG.setAttribute('data-src-img', MOVIE_IMG);
	LIKED_BUTTON.className = (IS_LIKED)
		? 'material-icons liked-movie__button liked-movie__button--liked'
		: 'material-icons liked-movie__button';
	// getLikedMovieListFromLocalStorage()[ID] && LIKED_BUTTON.classList.add('liked-movie__button--liked');
	LIKED_BUTTON.innerText = (IS_LIKED)
		? 'favorite'
		: 'favorite_border';
	DATA_CONTAINER.setAttribute('id', `liked-movie__data-id-${counterMovies}`);
	DATA_CONTAINER.className = 'liked-movie__data';

	// addEventListers
	IMG.addEventListener('error', () => IMG.src = `https://via.placeholder.com/300x450/8b48bf/ffffff?text=sorry :(`
	);
	LIKED_BUTTON.addEventListener('click', () => clickLikeButton(LIKED_BUTTON, movie));
	DATA_CONTAINER.addEventListener('click', () => showMovieDetails(movie.id));

	// Append elements
	DATA_CONTAINER.innerHTML = `<div class="liked-movie__data-container">
		<h3 class="liked-movie__title">${TITLE}</h3>
		<div>
			<div class="liked-movie__info-movie-container">
				<p class="material-icons">star</p>
				<p>${VOTES}</p>
			</div>
			<p>${AGE}</p>
		</div>
	</div>`;
	FIGURE.append(IMG);
	ARTICLE.append(DATA_CONTAINER, FIGURE, LIKED_BUTTON);
	container.appendChild(ARTICLE);

	LAZY_LOADER.observe(IMG);
	counterMovies++;
};

const clickLikeButton = (likedButton: HTMLButtonElement, movie: InterfaceMovieSearch): void => {
	const { hash: HASH } = location;

	likedButton.classList.toggle('liked-movie__button--liked');

	const IS_LIKED = likedButton.classList.contains('liked-movie__button--liked');

	likedButton.innerText = (IS_LIKED)
		? 'favorite'
		: 'favorite_border';

	setLikeMovieOnLocalStorage(movie);

	const AMOUNT_LIKED_MOVIES = amountLikedMovies();

	if (AMOUNT_LIKED_MOVIES && HASH === '#home') {
		showLikedMovieSection();
	} else {
		LIKED_MOVIE_SECTION.classList.add('hidden');
	}
};

let counterMovies = 0;
// const IsButtonLoadMore = false;
