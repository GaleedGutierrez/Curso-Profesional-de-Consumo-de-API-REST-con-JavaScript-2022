import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { InterfaceCategories, InterfaceGenres, InterfaceLikeMovie, InterfaceMovie, InterfaceMovieSearch, InterfaceMoviesByCategory, InterfaceTheMovieDB } from './interfaces.mjs';
import api from './api.mjs';
import { setPaginatedMovieByScroll } from './setData.mjs';

export const getTrendingMoviesPreview = async (): Promise<InterfaceMovieSearch[]> => {
	const RESPONSE: AxiosResponse = await api('trending/movie/day');
	const DATA: InterfaceTheMovieDB = RESPONSE.data;
	const MOVIES = DATA.results;

	return MOVIES;
};

export const getCategoriesPreview = async (): Promise<InterfaceGenres[]> => {
	const RESPONSE: AxiosResponse = await api(`genre/movie/list`);
	const DATA: InterfaceCategories = RESPONSE.data;
	const CATEGORIES = DATA.genres;

	return CATEGORIES;
};

export const getMoviesByCategory = async (id: string): Promise<InterfaceMovieSearch[]> => {
	const config: AxiosRequestConfig = {
		params : {
			with_genres : id
		}
	};
	const RESPONSE: AxiosResponse = await api('discover/movie', config);
	const DATA: InterfaceMoviesByCategory = RESPONSE.data;
	const MOVIES: InterfaceMovieSearch[] = DATA.results;

	return MOVIES;
};

export const getMovieBySearch = async (query: string): Promise<InterfaceMovieSearch[]> => {
	const config: AxiosRequestConfig = {
		params : {
			query
		}
	};
	const RESPONSE: AxiosResponse = await api('search/movie', config);
	const DATA: InterfaceMoviesByCategory = RESPONSE.data;
	const MOVIES: InterfaceMovieSearch[] = DATA.results;

	return MOVIES;
};

export const getMovieById = async (id: string): Promise<InterfaceMovie> => {
	const RESPONSE: AxiosResponse = await api(`movie/${id}`);
	const MOVIE: InterfaceMovie = RESPONSE.data;

	return MOVIE;
};

export const getRelatedMoviesId = async (id: number): Promise<InterfaceMovieSearch[]> => {
	const RESPONSE: AxiosResponse = await api(`movie/${id}/recommendations`);
	const DATA: InterfaceTheMovieDB = RESPONSE.data;
	const RELATED_MOVIES = DATA.results;

	return RELATED_MOVIES;
};

export const getPaginatedMovies = (): void => {
	const {
		scrollTop: SCROLL_TOP,
		scrollHeight: SCROLL_HEIGHT,
		clientHeight: CLIENT_HEIGHT
	} = document.documentElement;

	const IS_SCROLL_BOTTOM = (SCROLL_TOP + CLIENT_HEIGHT) >= (SCROLL_HEIGHT - 15);
	const [HASH] = location.hash.split('=');
	const IS_NOT_HOME_AND_MOVIE = HASH !== '#home' && HASH !== '#movie';

	if (IS_SCROLL_BOTTOM && IS_NOT_HOME_AND_MOVIE) setPaginatedMovieByScroll();
};

export const getLikedMovieListFromLocalStorage = (): InterfaceLikeMovie => {
	const MOVIES_LIST = localStorage.getItem('liked-movie');
	const MOVIES: InterfaceLikeMovie = (MOVIES_LIST)
		? JSON.parse(MOVIES_LIST)
		: {};

	return MOVIES;
};

export const currentPageMoviesUpdate = (): (refresh?: boolean) => number => {
	let pageMovies = 1;

	return function (refresh = false) {
		pageMovies = (refresh)
			? 1
			: pageMovies + 1;

		return pageMovies;
	};
};

export const numberPageMovies = currentPageMoviesUpdate();

