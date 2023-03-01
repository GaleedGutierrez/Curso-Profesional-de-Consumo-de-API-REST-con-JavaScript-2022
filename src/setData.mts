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
