import { AxiosResponse } from 'axios';
import { InterfaceCategories, InterfaceMovie, InterfaceMovieSearch, InterfaceMoviesByCategory, InterfaceTheMovieDB } from './interfaces.mjs';
import { insertMovies } from './index.js';
import { GENERIC_LIST_CONTAINER } from './nodes.mjs';
import { api } from './api.mjs';

export const getTrendingMoviesPreview = async (): Promise<InterfaceMovieSearch[]> => {
	const RESPONSE: AxiosResponse = await api('trending/movie/day');
	const DATA: InterfaceTheMovieDB = RESPONSE.data;
	const MOVIES = DATA.results;

	return MOVIES;
};

export const getCategoriesPreview = async () => {
	const RESPONSE: AxiosResponse = await api(`genre/movie/list`);
	const DATA: InterfaceCategories = RESPONSE.data;
	const CATEGORIES = DATA.genres;

	return CATEGORIES;
};

export const getMoviesByCategory = async (id: string) => {
	const RESPONSE: AxiosResponse = await api('discover/movie', {
		params : {
			with_genres : id
		},
	});
	const DATA: InterfaceMoviesByCategory = RESPONSE.data;
	const MOVIES: InterfaceMovieSearch[] = DATA.results;

	return MOVIES;
};

export const getMovieBySearch = async (query: string) => {
	const RESPONSE: AxiosResponse = await api('search/movie', {
		params : {
			query
		},
	});
	const DATA: InterfaceMoviesByCategory = RESPONSE.data;
	const MOVIES: InterfaceMovieSearch[] = DATA.results;

	return MOVIES;
};

export const getMovieById = async (id: string): Promise<InterfaceMovie> => {
	const RESPONSE: AxiosResponse = await api(`movie/${id}`);
	const MOVIE: InterfaceMovie = RESPONSE.data;

	return MOVIE;
};

export const getRelatedMoviesId = async (id: number) => {
	const RESPONSE: AxiosResponse = await api(`/movie/${id}/recommendations`);
	const DATA: InterfaceTheMovieDB = RESPONSE.data;
	const RELATED_MOVIES = DATA.results;

	return RELATED_MOVIES;
};

export const getPaginatedMovies = async () => {
	const {
		scrollTop: SCROLL_TOP,
		scrollHeight: SCROLL_HEIGHT,
		clientHeight: CLIENT_HEIGHT
	} = document.documentElement;
	const IS_SCROLL_BOTTOM = (SCROLL_TOP + CLIENT_HEIGHT) >= (SCROLL_HEIGHT - 15);
	const IS_NOT_HOME = location.hash !== '#home';

	if (IS_SCROLL_BOTTOM && IS_NOT_HOME) {
		type TypeHashName = keyof typeof HASHES_ROUTES;
		const HASHES_ROUTES = {
			'#trends'   : 'trending/movie/day',
			'#category' : 'discover/movie',
			'#search'   : 'search/movie'
		};
		const DATA_OF_HASH = location.hash.split('=');
		const HASH_NAME = DATA_OF_HASH[0] as TypeHashName;
		const EXTRA_INFO = DATA_OF_HASH[1];
		const ROUT = HASHES_ROUTES[HASH_NAME];
		const params = {
			page        : pageMovies(),
			with_genres : '',
			query       : ''
		};

		if (HASH_NAME === '#category') {
			const [ID_CATEGORY] = EXTRA_INFO.split('-');

			params.with_genres = ID_CATEGORY;
		}

		if (HASH_NAME === '#search') {
			const QUERY_SEARCH = EXTRA_INFO;

			params.query = QUERY_SEARCH;
		}

		const RESPONSE: AxiosResponse = await api(ROUT, { params });
		const DATA: InterfaceTheMovieDB = RESPONSE.data;
		const MOVIES = DATA.results;
		const IS_MAX_PAGE = DATA.page > DATA.total_pages;

		if (IS_MAX_PAGE) return;

		const IS_CAROUSEL = false;

		insertMovies(MOVIES, GENERIC_LIST_CONTAINER, IS_CAROUSEL, { clean: false });
	}
};

export const currentPageMoviesUpdate = () => {
	let pageMovies = 1;

	return function (refresh = false) {
		pageMovies = (refresh)
			? 1
			: pageMovies + 1;

		return pageMovies;
	};
};

// const waitATime = () => {
// 	return new Promise((result, reject) => {
// 		setTimeout(() => result, 2000);
// 	});
// };

export const pageMovies = currentPageMoviesUpdate();
