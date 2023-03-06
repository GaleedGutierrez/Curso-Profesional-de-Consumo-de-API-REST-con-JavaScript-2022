import { insertMovies } from './index.js';
import { getCategoriesPreview, getTrendingMoviesPreview } from './getData.mjs';
import { InterfaceGenres, InterfaceMovieSearch } from './interfaces.mjs';
import { CAROUSEL_CONTAINER } from './nodes.mjs';

export const setImgTrending = async (): Promise<void> => {
	const MOVIES = await getTrendingMoviesPreview();
	const IS_CAROUSEL = true;

	insertMovies(MOVIES, CAROUSEL_CONTAINER, IS_CAROUSEL);
};

export const setCategory = async (category: InterfaceGenres[], container: HTMLElement, isNotMovie: boolean) => {
	container.innerHTML = '';

	if (isNotMovie)
		category = await getCategoriesPreview();

	for (const CATEGORY of category) {
		const { id: ID, name: NAME } = CATEGORY;
		const CATEGORY_HTML = `<a id="category-id-${ID}" class="categories__category categories__category--action" href="#category=${ID}-${NAME}">${NAME}</a>`;

		container.innerHTML += CATEGORY_HTML;
	}
};

export const setGenericMoviesList = (movies: InterfaceMovieSearch[], container: HTMLElement, carousel: boolean) => {
	container.innerHTML = '';
	insertMovies(movies, container, carousel);
};

export const likeMovie = (movie: InterfaceMovieSearch) => {
	const ID = movie.id;
	const LIKED_MOVIE_LIST = likedMovieList();
	const IS_REPEAT = LIKED_MOVIE_LIST[ID];

	LIKED_MOVIE_LIST[ID] = (IS_REPEAT)
		? undefined
		: movie;

	const LIKED_MOVIE_LIST_STRING = JSON.stringify(LIKED_MOVIE_LIST);

	localStorage.setItem('liked-movie', LIKED_MOVIE_LIST_STRING);
};

const likedMovieList = () => {
	const MOVIES_LIST = localStorage.getItem('liked-movie');
	const MOVIES = (MOVIES_LIST)
		? JSON.parse(MOVIES_LIST)
		: {};

	return MOVIES;
};
