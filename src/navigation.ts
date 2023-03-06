import { getMovieById, getMovieBySearch, getMoviesByCategory, getPaginatedMovies, getRelatedMoviesId, getTrendingMoviesPreview, pageMovies } from './getData.mjs';
import { InterfaceMovie } from './interfaces.mjs';
import { BUTTONS_GO_BACK, BUTTON_SEARCH, BUTTON_TREADING, CAROUSEL_CONTAINER, CATEGORIES_CONTAINER, CATEGORIES_SECTION, GENERIC_LIST, GENERIC_LIST_CONTAINER, HEADER_CATEGORY, HEADER_MAIN, HEADER_TITLE, LIKED_MOVIE_SECTION, MOVIE_DETAILS, SEARCH_INPUT, SIMILAR_MOVIES, SIMILAR_MOVIES_CAROUSEL, SIMILAR_MOVIES_SCROLL, TITLE_CATEGORY, TRENDING_PREVIEW } from './nodes.mjs';
import { setCategory, setGenericMoviesList, setImgTrending } from './setData.mjs';
import { removeSkeleton, removeSkeletonGoBackButton, skeletonMovieAndCategories } from './skeleton.js';

const navigator = () => {
	const BACK_TO_ONE = true;

	window.scroll(0, 0);
	pageMovies(BACK_TO_ONE);

	const HASHES = {
		'#trends'    : trendsPage,
		'#search='   : searchPage,
		'#movie='    : moviePage,
		'#category=' : categoryPage,
	};
	const HASHES_KEYS = Object.keys(HASHES);

	for (const KEY of HASHES_KEYS) {
		if (location.hash.startsWith(KEY)) {
			HASHES[KEY as keyof typeof HASHES]();

			return;
		}
	}

	homePage();
};

const homePage = async () => {
	const ARE_THERE_MOVIES = true;
	const ARE_THERE_CATEGORIES = true;
	const ARE_THERE_CARROUSEL = true;

	HEADER_CATEGORY.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	GENERIC_LIST.classList.add('hidden');

	HEADER_MAIN.classList.remove('hidden');
	TRENDING_PREVIEW.classList.remove('hidden');
	CATEGORIES_SECTION.classList.remove('hidden');
	HEADER_TITLE.classList.remove('hidden');
	LIKED_MOVIE_SECTION.classList.remove('hidden');

	skeletonMovieAndCategories([ CAROUSEL_CONTAINER, CATEGORIES_SECTION ], ARE_THERE_MOVIES, ARE_THERE_CATEGORIES, ARE_THERE_CARROUSEL);
	await setImgTrending();
	setCategory([], CATEGORIES_CONTAINER, true);
};

const categoryPage = async () => {
	const ARE_THERE_MOVIES = true;
	const ARE_THERE_CATEGORIES = false;
	const ARE_THERE_CARROUSEL = false;
	const [ HASH_NAME, CATEGORY_INFO ] = location.hash.split('=');
	const [ ID, NAME ] = CATEGORY_INFO.split('-');
	const MOVIES = await getMoviesByCategory(ID);
	const IS_THERE_SPACE = NAME.includes('%20');
	const IS_THERE_TITLE = TITLE_CATEGORY.classList.contains('category-movie__title');

	if (IS_THERE_TITLE)
		TITLE_CATEGORY.classList.remove('category-movie__title');

	TITLE_CATEGORY.innerHTML = '';

	HEADER_MAIN.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	TRENDING_PREVIEW.classList.add('hidden');
	CATEGORIES_SECTION.classList.add('hidden');
	LIKED_MOVIE_SECTION.classList.add('hidden');

	HEADER_CATEGORY.classList.remove('hidden');
	GENERIC_LIST.classList.remove('hidden');

	skeletonMovieAndCategories([GENERIC_LIST_CONTAINER], ARE_THERE_MOVIES, ARE_THERE_CATEGORIES, ARE_THERE_CARROUSEL);

	TITLE_CATEGORY.classList.add('category-movie__title');
	HEADER_CATEGORY.setAttribute('id', `header__category-id-${ID}`);
	TITLE_CATEGORY.setAttribute('id', `category-movie__title-id-${ID}`);
	TITLE_CATEGORY.innerHTML = (IS_THERE_SPACE)
		? NAME.replace('%20', '&nbsp')
		: NAME;
	setGenericMoviesList(MOVIES, GENERIC_LIST_CONTAINER, false);
	removeSkeletonGoBackButton();
};

const moviePage = async () => {
	const THERE_IS_SKELETON = true;
	const ARE_THERE_MOVIES = true;
	const ARE_THERE_CATEGORIES = true;
	const ARE_THERE_CARROUSEL = true;
	const [ HASH_NAME, ID ] = location.hash.split('=');
	const MOVIE = await getMovieById(ID);

	movieDetails(THERE_IS_SKELETON);

	TRENDING_PREVIEW.classList.add('hidden');
	CATEGORIES_SECTION.classList.add('hidden');
	GENERIC_LIST.classList.add('hidden');
	HEADER_MAIN.classList.add('hidden');
	HEADER_TITLE.classList.add('hidden');
	HEADER_CATEGORY.classList.add('hidden');
	LIKED_MOVIE_SECTION.classList.add('hidden');

	SIMILAR_MOVIES.classList.remove('hidden');
	MOVIE_DETAILS.classList.remove('hidden');

	movieDetails(!THERE_IS_SKELETON, MOVIE);

	const MOVIE_BUTTON_GO_BACK = document.querySelector('#movie-details__button-go-back-id') as HTMLButtonElement;
	const MOVIE_CATEGORIES_CONTAINER = document.querySelector('#similar-movies__categories-container-id') as HTMLElement;
	const RELATED_MOVIES = await getRelatedMoviesId(MOVIE.id);

	skeletonMovieAndCategories([ SIMILAR_MOVIES_CAROUSEL, MOVIE_CATEGORIES_CONTAINER ], ARE_THERE_MOVIES, ARE_THERE_CATEGORIES, ARE_THERE_CARROUSEL);
	MOVIE_BUTTON_GO_BACK.addEventListener('click', goBackButton);

	setCategory(MOVIE.genres, MOVIE_CATEGORIES_CONTAINER, false);
	setGenericMoviesList(RELATED_MOVIES, SIMILAR_MOVIES_CAROUSEL, true);
	SIMILAR_MOVIES_SCROLL.scroll(0, 0);
};

const movieDetails = (isSkeleton: boolean, movie = {} as InterfaceMovie) => {
	MOVIE_DETAILS.innerHTML = `${(isSkeleton)
		? '<button class="material-icons movie-details__arrow-left-skeleton" id="movie-details__button-go-back-id"></button>'
		: '<button class="material-icons movie-details__arrow-left" id="movie-details__button-go-back-id">chevron_left</button>'}
	${(isSkeleton)
		? '<figure class="movie-details__img-skeleton"></figure>'
		: `<figure class="movie-details__img">
			<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
		</figure>`}
	<div class="movie-details__data-container">
		<div class="movie-details__header">
		${(isSkeleton)
		? '<h2 class="data-container__title-skeleton"></h2>'
		: `<h2 class="data-container__title">${movie.title}</h2>`}
			<div class="data-container__rating-container">
				${(isSkeleton)
		? '<p class="material-symbols-outlined data-container__rating-star-skeleton"></p>'
		: '<p class="material-icons data-container__rating-star">star</p>'}
				${(isSkeleton)
		? '<p class="data-container__rating-skeleton"></p>'
		: `<p class="data-container__rating">${movie.vote_average.toFixed(2)}</p>`}
			</div>
		</div>
		${(isSkeleton)
		? '<p class="movie-details__description-skeleton"></p>'
		: `<p class="movie-details__description">${movie.overview}</p>`}
		<div id="similar-movies__categories-container-id" class="main__categories">
		</div>
	</div>`;
};

const searchPage = async () => {
	const ITEM_SKELETON = document.createElement('article');
	const [ HASH_NAME, QUERY ] = location.hash.split('=');
	const MOVIES = await getMovieBySearch(QUERY);

	ITEM_SKELETON.classList.add('carousel__item-generic-list-skeleton');

	TRENDING_PREVIEW.classList.add('hidden');
	CATEGORIES_SECTION.classList.add('hidden');
	HEADER_CATEGORY.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	HEADER_TITLE.classList.add('hidden');
	LIKED_MOVIE_SECTION.classList.add('hidden');

	for (let i = 0; i < 10; i++) {
		GENERIC_LIST_CONTAINER.append(ITEM_SKELETON.cloneNode(true));
	}

	HEADER_MAIN.classList.remove('hidden');
	GENERIC_LIST.classList.remove('hidden');

	if (MOVIES.length !== 0) {
		setGenericMoviesList(MOVIES, GENERIC_LIST_CONTAINER, false);
		removeSkeletonGoBackButton();
	}
};

const trendsPage = async () => {
	const ITEM_SKELETON = document.createElement('article');
	const MOVIES = await getTrendingMoviesPreview();
	const IS_THERE_TITLE = TITLE_CATEGORY.classList.contains('category-movie__title');

	if (IS_THERE_TITLE)
		TITLE_CATEGORY.classList.remove('category-movie__title');

	ITEM_SKELETON.classList.add('carousel__item-generic-list-skeleton');
	HEADER_MAIN.classList.add('hidden');
	TRENDING_PREVIEW.classList.add('hidden');
	CATEGORIES_SECTION.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	HEADER_TITLE.classList.add('hidden');
	LIKED_MOVIE_SECTION.classList.add('hidden');

	HEADER_CATEGORY.classList.remove('hidden');
	GENERIC_LIST.classList.remove('hidden');

	for (let i = 0; i < 10; i++) {
		GENERIC_LIST_CONTAINER.append(ITEM_SKELETON.cloneNode(true));
	}

	TITLE_CATEGORY.innerText = 'Tendencias';
	HEADER_CATEGORY.setAttribute('id', `header__category-id-28`);
	TITLE_CATEGORY.setAttribute('id', `category-movie__title-id-28`);
	TITLE_CATEGORY.classList.add('category-movie__title');
	setGenericMoviesList(MOVIES, GENERIC_LIST_CONTAINER, false);
	removeSkeletonGoBackButton();
};

const goBackButton = () => {
	const IS_HASH_HOME = location.hash !== '#home';
	const IS_LAST_NOT_HOME = ARRAY_HASHES.at(-1) !== '#home';

	if (IS_HASH_HOME) ARRAY_HASHES.pop();

	location.hash = (IS_LAST_NOT_HOME)
		? `${ARRAY_HASHES.at(-1)}`
		: '#home';
};

const addHash = () => {
	removeSkeleton();

	const IS_REPEAT = ARRAY_HASHES.some((hash) => location.hash === hash);

	if (!IS_REPEAT)
		ARRAY_HASHES.push(location.hash);
};

const goSearchSection = (event: Event) => {
	event.preventDefault();

	const SEARCH = SEARCH_INPUT.value;

	location.hash = `#search=${SEARCH}`;
};

BUTTON_TREADING.addEventListener('click', () => {
	location.hash = '#trends';
});

BUTTON_SEARCH.addEventListener('click', goSearchSection);

for (const BUTTON of BUTTONS_GO_BACK) {
	BUTTON.addEventListener('click', goBackButton);
}

const ARRAY_HASHES = [ '#home', location.hash ];

window.addEventListener('load', navigator, false);
window.addEventListener('load', removeSkeleton, false);
window.addEventListener('hashchange', addHash, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', getPaginatedMovies);

