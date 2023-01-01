import API_KEY from './authentication.mjs';
import { CAROUSEL_CONTAINER, CATEGORIES_CONTAINER, GENERIC_LIST_CONTAINER } from './nodes.mjs';
import { CategoriesInterface, GenresInterface, MovieInterface, MovieSearchInterface, MoviesByCategoryInterface, TheMovieDBInterface } from './interfaces.mjs';
import { AxiosResponse } from 'axios';
// FIXME: Comentar la importación de Axios cada vez que se guarden cambios.
// import axios from 'axios';

export const getTrendingMoviesPreview = async (): Promise<MovieSearchInterface[]> => {
	const RESPONSE: AxiosResponse = await api('trending/movie/day');
	const DATA: TheMovieDBInterface = RESPONSE.data;
	const MOVIES = DATA.results;

	return MOVIES;
};

export const setImgTrending = async (): Promise<void> => {
	const MOVIES = await getTrendingMoviesPreview();

	insertMovies(MOVIES, CAROUSEL_CONTAINER, true);
};

const getCategoriesPreview = async () => {
	const RESPONSE: AxiosResponse = await api(`genre/movie/list`);
	const DATA: CategoriesInterface = RESPONSE.data;
	const CATEGORIES = DATA.genres;

	return CATEGORIES;
};

export const setCategory = async (category: GenresInterface[], container: HTMLElement, isNotMovie: boolean) => {
	if (isNotMovie)
		category = await getCategoriesPreview();

	for (const CATEGORY of category) {
		const { id: ID, name: NAME } = CATEGORY;
		const CATEGORY_HTML = `<a id="category-id-${ID}" class="categories__category categories__category--action" href="#category=${ID}-${NAME}">${NAME}</a>`;

		container.innerHTML += CATEGORY_HTML;
	}
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

export const setGenericMoviesList = (movies: MovieSearchInterface[], container: HTMLElement, carousel: boolean) => {
	container.innerHTML = '';
	insertMovies(movies, container, carousel);
};

const insertMovies = (movies: MovieSearchInterface[], container: HTMLElement, carousel: boolean) => {

	for (const MOVIE of movies) {
		const ARTICLE = document.createElement('article');
		const MOVIE_IMG = `https://image.tmdb.org/t/p/w300${MOVIE.poster_path}`;
		const ALT_IMG = MOVIE.title;

		ARTICLE.addEventListener('click', () => showMovieDetails(MOVIE.id));

		if (carousel) ARTICLE.setAttribute('class', 'carousel__item');

		ARTICLE.innerHTML = `<figure>
			<img class="generic-list__img" src="${MOVIE_IMG}" alt="${ALT_IMG}"/>
		</figure>`;
		container.appendChild(ARTICLE);
	}
};

const showMovieDetails = (id: number) => {
	location.hash = `#movie=${id}`;
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


const api = axios.create({
	baseURL : 'https://api.themoviedb.org/3/',
	headers : {
		'Content-Type' : 'application/json;charset=utf-8'
	},
	params : {
		api_key : API_KEY
	}
});

setImgTrending();
setCategory([], CATEGORIES_CONTAINER, true);
