import { getLikedMovieListFromLocalStorage, getMovieById, getMovieBySearch, getMoviesByCategory, getPaginatedMovies, getRelatedMoviesId, getTrendingMoviesPreview } from './getData.mjs';
import { LANGUAGES_LIST, numberPageMovies } from './index.js';
import { BUTTONS_GO_BACK, BUTTON_CHANGE_LANGUAGE, BUTTON_CURRENT_LANGUAGE, BUTTON_SEARCH, BUTTON_TREADING, CAROUSEL_CONTAINER, CATEGORIES_CONTAINER, CATEGORIES_SECTION, CHANGE_LANGUAGE_CONTAINER, GENERIC_LIST, GENERIC_LIST_CONTAINER, HEADER_CATEGORY, HEADER_MAIN, HEADER_TITLE, INPUT_CHANGE_LANGUAGE, LANGUAGE_CONTAINER, LIKED_MOVIE_SECTION, MOVIE_DETAILS, SEARCH_INPUT, SIMILAR_MOVIES, SIMILAR_MOVIES_CAROUSEL, SIMILAR_MOVIES_SCROLL, TITLE_CATEGORY, TRENDING_PREVIEW } from './nodes.mjs';
import { setCategory, setGenericMoviesList, setImgTrending, setLikedMoviesFromLocalStorage } from './setData.mjs';
import { removeSkeleton, removeSkeletonGoBackButton, skeletonMovieAndCategories } from './skeleton.js';
// Change page
export function showMovieDetails(id) {
    location.hash = `#movie=${id}`;
}
function goSearchSection(event) {
    event.preventDefault();
    const SEARCH = SEARCH_INPUT.value;
    location.hash = `#search=${SEARCH}`;
}
BUTTON_TREADING.addEventListener('click', () => {
    location.hash = '#trends';
});
function goBackButton() {
    const { hash: HASH } = location;
    const IS_HASH_HOME = HASH !== '#home';
    const IS_LAST_NOT_HOME = ARRAY_HASHES.at(-1) !== '#home';
    if (IS_HASH_HOME)
        ARRAY_HASHES.pop();
    location.hash = (IS_LAST_NOT_HOME)
        ? `${ARRAY_HASHES.at(-1)}`
        : '#home';
}
// Utils
function hiddenAllElements() {
    HEADER_CATEGORY.classList.add('hidden');
    MOVIE_DETAILS.classList.add('hidden');
    SIMILAR_MOVIES.classList.add('hidden');
    GENERIC_LIST.classList.add('hidden');
    HEADER_MAIN.classList.add('hidden');
    TRENDING_PREVIEW.classList.add('hidden');
    CATEGORIES_SECTION.classList.add('hidden');
    LIKED_MOVIE_SECTION.classList.add('hidden');
    HEADER_TITLE.classList.add('hidden');
    LANGUAGE_CONTAINER.classList.add('hidden');
}
export function showLikedMovieSection() {
    LIKED_MOVIE_SECTION.classList.remove('hidden');
    setLikedMoviesFromLocalStorage();
}
export function amountLikedMovies() {
    const LIKED_MOVIE_LIST = getLikedMovieListFromLocalStorage();
    const AMOUNT_LIKED_MOVIES = Object.keys(LIKED_MOVIE_LIST).length;
    return AMOUNT_LIKED_MOVIES;
}
function navigation() {
    const BACK_TO_ONE = true;
    const { hash: HASH } = location;
    window.scroll(0, 0);
    numberPageMovies(BACK_TO_ONE);
    const HASHES = {
        '#trends': trendsPage,
        '#search=': searchPage,
        '#movie=': moviePage,
        '#category=': categoryPage,
    };
    for (const KEY in HASHES) {
        if (HASH.startsWith(KEY)) {
            HASHES[KEY]();
            return;
        }
    }
    updateLanguage();
    homePage();
}
async function homePage() {
    const ARE_THERE_MOVIES = true;
    const ARE_THERE_CATEGORIES = true;
    const ARE_THERE_CARROUSEL = true;
    const AMOUNT_LIKED_MOVIES = amountLikedMovies();
    BUTTON_CHANGE_LANGUAGE.innerText = language.toUpperCase();
    hiddenAllElements();
    HEADER_MAIN.classList.remove('hidden');
    TRENDING_PREVIEW.classList.remove('hidden');
    CATEGORIES_SECTION.classList.remove('hidden');
    HEADER_TITLE.classList.remove('hidden');
    LANGUAGE_CONTAINER.classList.remove('hidden');
    skeletonMovieAndCategories([CAROUSEL_CONTAINER, CATEGORIES_SECTION], ARE_THERE_MOVIES, ARE_THERE_CATEGORIES, ARE_THERE_CARROUSEL);
    setImgTrending();
    setCategory([], CATEGORIES_CONTAINER, true);
    if (AMOUNT_LIKED_MOVIES !== 0)
        showLikedMovieSection();
}
async function categoryPage() {
    const { hash: HASH } = location;
    const ARE_THERE_MOVIES = true;
    const ARE_THERE_CATEGORIES = false;
    const ARE_THERE_CARROUSEL = false;
    const CATEGORY_INFO = HASH.split('=')[1];
    const [ID, NAME] = CATEGORY_INFO.split('-');
    const MOVIES = await getMoviesByCategory(ID);
    const IS_THERE_TITLE = TITLE_CATEGORY.classList.contains('category-movie__title');
    if (IS_THERE_TITLE)
        TITLE_CATEGORY.classList.remove('category-movie__title');
    TITLE_CATEGORY.innerHTML = '';
    hiddenAllElements();
    HEADER_CATEGORY.classList.remove('hidden');
    GENERIC_LIST.classList.remove('hidden');
    skeletonMovieAndCategories([GENERIC_LIST_CONTAINER], ARE_THERE_MOVIES, ARE_THERE_CATEGORIES, ARE_THERE_CARROUSEL);
    TITLE_CATEGORY.classList.add('category-movie__title');
    HEADER_CATEGORY.setAttribute('id', `header__category-id-${ID}`);
    TITLE_CATEGORY.setAttribute('id', `category-movie__title-id-${ID}`);
    TITLE_CATEGORY.innerHTML = decodeURI(NAME);
    setGenericMoviesList(MOVIES, GENERIC_LIST_CONTAINER, false);
    removeSkeletonGoBackButton();
}
async function moviePage() {
    const { hash: HASH } = location;
    const THERE_IS_SKELETON = true;
    const ARE_THERE_MOVIES = true;
    const ARE_THERE_CATEGORIES = true;
    const ARE_THERE_CARROUSEL = true;
    const ID = HASH.split('=')[1];
    const MOVIE = await getMovieById(ID);
    movieDetails(THERE_IS_SKELETON);
    hiddenAllElements();
    SIMILAR_MOVIES.classList.remove('hidden');
    MOVIE_DETAILS.classList.remove('hidden');
    movieDetails(!THERE_IS_SKELETON, MOVIE);
    const MOVIE_BUTTON_GO_BACK = document.querySelector('#movie-details__button-go-back-id');
    const MOVIE_CATEGORIES_CONTAINER = document.querySelector('#similar-movies__categories-container-id');
    const RELATED_MOVIES = await getRelatedMoviesId(MOVIE.id);
    skeletonMovieAndCategories([SIMILAR_MOVIES_CAROUSEL, MOVIE_CATEGORIES_CONTAINER], ARE_THERE_MOVIES, ARE_THERE_CATEGORIES, ARE_THERE_CARROUSEL);
    MOVIE_BUTTON_GO_BACK.addEventListener('click', goBackButton);
    setCategory(MOVIE.genres, MOVIE_CATEGORIES_CONTAINER, false);
    setGenericMoviesList(RELATED_MOVIES, SIMILAR_MOVIES_CAROUSEL, true);
    SIMILAR_MOVIES_SCROLL.scroll(0, 0);
}
function movieDetails(isSkeleton, movie = {}) {
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
}
async function searchPage() {
    const { hash: HASH } = location;
    const ITEM_SKELETON = document.createElement('article');
    const QUERY = HASH.split('=')[1];
    const MOVIES = await getMovieBySearch(QUERY);
    ITEM_SKELETON.classList.add('carousel__item-generic-list-skeleton');
    hiddenAllElements();
    for (let i = 0; i < 10; i++) {
        GENERIC_LIST_CONTAINER.append(ITEM_SKELETON.cloneNode(true));
    }
    HEADER_MAIN.classList.remove('hidden');
    GENERIC_LIST.classList.remove('hidden');
    if (MOVIES.length !== 0) {
        setGenericMoviesList(MOVIES, GENERIC_LIST_CONTAINER, false);
        removeSkeletonGoBackButton();
    }
}
async function trendsPage() {
    const ITEM_SKELETON = document.createElement('article');
    const MOVIES = await getTrendingMoviesPreview();
    const IS_THERE_TITLE = TITLE_CATEGORY.classList.contains('category-movie__title');
    if (IS_THERE_TITLE)
        TITLE_CATEGORY.classList.remove('category-movie__title');
    ITEM_SKELETON.classList.add('carousel__item-generic-list-skeleton');
    hiddenAllElements();
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
}
function addHash() {
    const { hash: HASH } = location;
    removeSkeleton();
    const IS_REPEAT = ARRAY_HASHES.some((hash) => HASH === hash);
    if (!IS_REPEAT)
        ARRAY_HASHES.push(HASH);
}
async function updateLanguage() {
    if (CURRENT_LANGUAGE.length === 2) {
        const SYSTEM_LANGUAGE = (await LANGUAGES_LIST).find((language) => language.iso_639_1 === CURRENT_LANGUAGE);
        language = navigator.language;
        if (SYSTEM_LANGUAGE) {
            BUTTON_CURRENT_LANGUAGE.innerHTML = `${SYSTEM_LANGUAGE.english_name} <span class="material-icons">keyboard_arrow_down</span`;
        }
    }
    else {
        const LOCAL_STORAGE_LANGUAGE = JSON.parse(CURRENT_LANGUAGE);
        const LANGUAGE_LOCAL_STORAGE = LOCAL_STORAGE_LANGUAGE.english_name;
        language = LOCAL_STORAGE_LANGUAGE.iso_639_1;
        BUTTON_CURRENT_LANGUAGE.innerHTML = `${LANGUAGE_LOCAL_STORAGE} <span class="material-icons">keyboard_arrow_down</span`;
    }
}
export async function changeLanguage(event) {
    const target = event.target;
    const { value } = target;
    const NEW_LANGUAGE = (await LANGUAGES_LIST).find((language) => language.iso_639_1 === value);
    if (!NEW_LANGUAGE)
        return;
    window.location.reload();
    localStorage.setItem('language', JSON.stringify(NEW_LANGUAGE));
}
function resizeBoxChangeLanguage() {
    const WITH = CHANGE_LANGUAGE_CONTAINER.clientWidth;
    CHANGE_LANGUAGE_CONTAINER.style.left = `calc(50% - ${WITH / 2}px)`;
}
for (const BUTTON of BUTTONS_GO_BACK) {
    BUTTON.addEventListener('click', goBackButton);
}
export let language = navigator.language.split('-')[0];
const CURRENT_LANGUAGE = localStorage.getItem('language') ?? language;
const { hash: HASH } = location;
const ARRAY_HASHES = ['#home', HASH];
INPUT_CHANGE_LANGUAGE.addEventListener('change', changeLanguage);
BUTTON_CURRENT_LANGUAGE.addEventListener('click', () => {
    INPUT_CHANGE_LANGUAGE.classList.toggle('languages-container__input--visible');
});
BUTTON_CHANGE_LANGUAGE.addEventListener('click', () => {
    CHANGE_LANGUAGE_CONTAINER.classList.toggle('languages-container__form-button-container--visible');
    resizeBoxChangeLanguage();
});
BUTTON_SEARCH.addEventListener('click', goSearchSection);
window.addEventListener('load', removeSkeleton, false);
window.addEventListener('hashchange', addHash, false);
window.addEventListener('scroll', getPaginatedMovies);
window.addEventListener('hashchange', navigation, false);
window.addEventListener('load', navigation, false);
window.addEventListener('resize', resizeBoxChangeLanguage);
//# sourceMappingURL=navigation.js.map