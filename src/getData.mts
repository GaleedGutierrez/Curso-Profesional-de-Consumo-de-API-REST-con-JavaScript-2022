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
	const RESPONSE: AxiosResponse = await api('trending/movie/day', {
		params : {
			page : pageMovies
		}
	});
	const DATA: TheMovieDBInterface = RESPONSE.data;
	const MOVIES = DATA.results;
	const IS_CAROUSEL = false;

	insertMovies(MOVIES, GENERIC_LIST_CONTAINER, IS_CAROUSEL, { clean: false });
	pageMovies++;
};

let pageMovies = 2;
