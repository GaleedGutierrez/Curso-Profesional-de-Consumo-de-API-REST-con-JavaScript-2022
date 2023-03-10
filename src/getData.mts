import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { InterfaceCategories, InterfaceGenres, InterfaceLanguageApi, InterfaceLikeMovie, InterfaceMovie, InterfaceMovieSearch, InterfaceMoviesByCategory, InterfaceTheMovieDB } from './interfaces.mjs';
import api from './api.mjs';
import { setPaginatedMovieByScroll } from './setData.mjs';
import { language } from './navigation.js';

export async function getTrendingMoviesPreview (): Promise<InterfaceMovieSearch[]> {
	const config = { params: { language } };

	const RESPONSE: AxiosResponse = await api('trending/movie/day', config);
	const DATA: InterfaceTheMovieDB = RESPONSE.data;
	const MOVIES = DATA.results;

	return MOVIES;
}

export async function getCategoriesPreview (): Promise<InterfaceGenres[]> {
	const config = { params: { language } };
	const RESPONSE: AxiosResponse = await api(`genre/movie/list`, config);
	const DATA: InterfaceCategories = RESPONSE.data;
	const CATEGORIES = DATA.genres;

	return CATEGORIES;
}

export async function getMoviesByCategory (id: string): Promise<InterfaceMovieSearch[]> {
	const config: AxiosRequestConfig = {
		params : {
			with_genres : id,
			language
		}
	};
	const RESPONSE: AxiosResponse = await api('discover/movie', config);
	const DATA: InterfaceMoviesByCategory = RESPONSE.data;
	const MOVIES: InterfaceMovieSearch[] = DATA.results;

	return MOVIES;
}

export async function getMovieBySearch (query: string): Promise<InterfaceMovieSearch[]> {
	const config: AxiosRequestConfig = {
		params : {
			query
		}
	};
	const RESPONSE: AxiosResponse = await api('search/movie', config);
	const DATA: InterfaceMoviesByCategory = RESPONSE.data;
	const MOVIES: InterfaceMovieSearch[] = DATA.results;

	return MOVIES;
}

export async function getMovieById (id: string): Promise<InterfaceMovie> {
	const config: AxiosRequestConfig = { params: { language } };
	const RESPONSE: AxiosResponse = await api(`movie/${id}`, config);
	const MOVIE: InterfaceMovie = RESPONSE.data;

	return MOVIE;
}

export async function getRelatedMoviesId (id: number): Promise<InterfaceMovieSearch[]> {
	const RESPONSE: AxiosResponse = await api(`movie/${id}/recommendations`);
	const DATA: InterfaceTheMovieDB = RESPONSE.data;
	const RELATED_MOVIES = DATA.results;

	return RELATED_MOVIES;
}

export function getPaginatedMovies (): void {
	const {
		scrollTop: SCROLL_TOP,
		scrollHeight: SCROLL_HEIGHT,
		clientHeight: CLIENT_HEIGHT
	} = document.documentElement;

	const IS_SCROLL_BOTTOM = (SCROLL_TOP + CLIENT_HEIGHT) >= (SCROLL_HEIGHT - 15);
	const [HASH] = location.hash.split('=');
	const IS_NOT_HOME_AND_MOVIE = HASH !== '#home' && HASH !== '#movie';

	if (IS_SCROLL_BOTTOM && IS_NOT_HOME_AND_MOVIE) setPaginatedMovieByScroll();
}

export function getLikedMovieListFromLocalStorage (): InterfaceLikeMovie {
	const MOVIES_LIST = localStorage.getItem('liked-movie');
	const MOVIES: InterfaceLikeMovie = (MOVIES_LIST)
		? JSON.parse(MOVIES_LIST)
		: {};

	return MOVIES;
}

export function currentPageMoviesUpdate (): (refresh?: boolean) => number {
	let pageMovies = 1;

	return function (refresh = false) {
		pageMovies = (refresh)
			? 1
			: pageMovies + 1;

		return pageMovies;
	};
}

export async function getLanguageApi () {
	const RESPONSE = await api('configuration/languages');
	const LANGUAGES: InterfaceLanguageApi[] = RESPONSE.data;

	return LANGUAGES;
}


