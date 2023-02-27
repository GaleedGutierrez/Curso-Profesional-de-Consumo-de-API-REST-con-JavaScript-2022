import { AxiosResponse } from 'axios';
import { CategoriesInterface, MovieInterface, MovieSearchInterface, MoviesByCategoryInterface, TheMovieDBInterface } from './interfaces.mjs';
import { insertMovies } from './index.js';
import { GENERIC_LIST_CONTAINER } from './nodes.mjs';
import { api } from './api.mjs';

export const getTrendingMoviesPreview = async (): Promise<MovieSearchInterface[]> => {
	const RESPONSE: AxiosResponse = await api('trending/movie/day');
	const DATA: TheMovieDBInterface = RESPONSE.data;
	const MOVIES = DATA.results;

	return MOVIES;
};

export const getCategoriesPreview = async () => {
	const RESPONSE: AxiosResponse = await api(`genre/movie/list`);
	const DATA: CategoriesInterface = RESPONSE.data;
	const CATEGORIES = DATA.genres;

	return CATEGORIES;
};

export const getMoviesByCategory = async (id: string) => {
	const RESPONSE: AxiosResponse = await api('discover/movie', {
		params : {
			with_genres : id
		},
	});
	const DATA: MoviesByCategoryInterface = RESPONSE.data;
	const MOVIES: MovieSearchInterface[] = DATA.results;

	return MOVIES;
};

export const getMovieBySearch = async (query: string) => {
	const RESPONSE: AxiosResponse = await api('search/movie', {
		params : {
			query
		},
	});
	const DATA: MoviesByCategoryInterface = RESPONSE.data;
	const MOVIES: MovieSearchInterface[] = DATA.results;

	return MOVIES;
};

export const getMovieById = async (id: string): Promise<MovieInterface> => {
	const RESPONSE: AxiosResponse = await api(`movie/${id}`);
	const MOVIE: MovieInterface = RESPONSE.data;

	return MOVIE;
};

export const getRelatedMoviesId = async (id: number) => {
	const RESPONSE: AxiosResponse = await api(`/movie/${id}/recommendations`);
	const DATA: TheMovieDBInterface = RESPONSE.data;
	const RELATED_MOVIES = DATA.results;

	return RELATED_MOVIES;
};

export const getPaginatedTrendingMovies = async () => {
	const {
		scrollTop: SCROLL_TOP,
		scrollHeight: SCROLL_HEIGHT,
		clientHeight: CLIENT_HEIGHT
	} = document.documentElement;
	const IS_SCROLL_BOTTOM = (SCROLL_TOP + CLIENT_HEIGHT) >= (SCROLL_HEIGHT - 15);

	if (IS_SCROLL_BOTTOM) {
		let idCategory = '';
		let querySearch = '';
		const [ HASH_NAME, EXTRA_INFO ] = location.hash.split('=');

		if (HASH_NAME === '#category')
			[idCategory] = EXTRA_INFO.split('-');
		if (HASH_NAME === '#search')
			querySearch = EXTRA_INFO;

		const RESPONSE: AxiosResponse = (HASH_NAME === '#trends')
			? await api('trending/movie/day', {
				params : {
					page : pageMovies(),
				}
			})
			: (HASH_NAME === '#category')
				? await api('discover/movie', {
					params : {
						page        : pageMovies(),
						with_genres : idCategory
					}
				})
				: await api('search/movie', {
					params : {
						page  : pageMovies(),
						query : querySearch
					},
				})
			;

		const DATA: TheMovieDBInterface = RESPONSE.data;
		const MOVIES = DATA.results;
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

export const pageMovies = currentPageMoviesUpdate();
