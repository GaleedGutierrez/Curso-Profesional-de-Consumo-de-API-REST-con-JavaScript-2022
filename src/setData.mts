import { insertMovies } from './index.js';
import { getCategoriesPreview, getLikedMovieListFromLocalStorage, getTrendingMoviesPreview, numberPageMovies } from './getData.mjs';
import { InterfaceGenres, InterfaceLikeMovie, InterfaceMovieSearch, InterfaceTheMovieDB } from './interfaces.mjs';
import { CAROUSEL_CONTAINER, GENERIC_LIST_CONTAINER, LIKED_MOVIE_CONTAINER } from './nodes.mjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import api from './api.mjs';
import { TypeHashName } from './types.mjs';

export const setImgTrending = async (): Promise<void> => {
	const MOVIES: InterfaceMovieSearch[] = await getTrendingMoviesPreview();
	const IS_CAROUSEL = true;

	insertMovies(MOVIES, CAROUSEL_CONTAINER, IS_CAROUSEL);
};

export const setCategory = async (category: InterfaceGenres[], container: HTMLElement, isNotMovie: boolean): Promise<void> => {
	container.innerHTML = '';

	if (isNotMovie)
		category = await getCategoriesPreview();

	for (const CATEGORY of category) {
		const { id: ID, name: NAME } = CATEGORY;
		const CATEGORY_HTML = `<a id="category-id-${ID}" class="categories__category categories__category--action" href="#category=${ID}-${NAME}">${NAME}</a>`;

		container.innerHTML += CATEGORY_HTML;
	}
};

export const setGenericMoviesList = (movies: InterfaceMovieSearch[], container: HTMLElement, carousel: boolean): void => {
	container.innerHTML = '';
	insertMovies(movies, container, carousel);
};

export const setPaginatedMovieByScroll = async (): Promise<void> => {
	const { hash: HASH } = location;
	let rout = '';
	const config: AxiosRequestConfig = {
		params : {
			page        : numberPageMovies(),
			with_genres : '',
			query       : ''
		}
	};
	const [ HASH_NAME, EXTRA_INFO ] = HASH.split('=');
	const HASHES_ROUTES = {
		'#trends'   : () => rout = 'trending/movie/day',
		'#category' : () => {
			const [ID_CATEGORY] = EXTRA_INFO.split('-');

			rout = 'discover/movie';
			config.params.with_genres = ID_CATEGORY;
		},
		'#search' : () => {
			const QUERY_SEARCH = EXTRA_INFO;

			rout = 'search/movie';
			config.params.query = QUERY_SEARCH;
		}
	};

	HASHES_ROUTES[HASH_NAME as TypeHashName]();

	const RESPONSE: AxiosResponse = await api(rout, config);
	const DATA: InterfaceTheMovieDB = RESPONSE.data;
	const MOVIES = DATA.results;
	const IS_MAX_PAGE = DATA.page > DATA.total_pages;

	if (IS_MAX_PAGE) return;

	const IS_CAROUSEL = false;

	insertMovies(MOVIES, GENERIC_LIST_CONTAINER, IS_CAROUSEL, { clean: false });
};

export const saveOrDeleteLikeMovieOnLocalStorage = (movie: InterfaceMovieSearch): void => {
	const ID = movie.id;
	let likedMovieList: InterfaceLikeMovie | string = getLikedMovieListFromLocalStorage();
	const IS_REPEAT = likedMovieList[ID];

	likedMovieList[ID] = (IS_REPEAT)
		? undefined
		: movie;
	likedMovieList = JSON.stringify(likedMovieList);
	localStorage.setItem('liked-movie', likedMovieList);
};

export const setLikedMoviesFromLocalStorage = (): void => {
	const IS_CAROUSEL = true;
	const LIKED_MOVIES = getLikedMovieListFromLocalStorage();
	const MOVIES: InterfaceMovieSearch[] = Object.values(LIKED_MOVIES);

	insertMovies(MOVIES, LIKED_MOVIE_CONTAINER, IS_CAROUSEL, { clean: true });
};

