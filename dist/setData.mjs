import { insertMovies, numberPageMovies } from './index.js';
import { getCategoriesPreview, getLanguageApi, getLikedMovieListFromLocalStorage, getTrendingMoviesPreview } from './getData.mjs';
import { CAROUSEL_CONTAINER, GENERIC_LIST_CONTAINER, LANGUAGE_DATALIST, LIKED_MOVIE_CONTAINER } from './nodes.mjs';
import api from './api.mjs';
export async function setImgTrending() {
    const MOVIES = await getTrendingMoviesPreview();
    const IS_CAROUSEL = true;
    insertMovies(MOVIES, CAROUSEL_CONTAINER, IS_CAROUSEL);
}
export async function setCategory(category, container, isNotMovie) {
    container.innerHTML = '';
    if (isNotMovie)
        category = await getCategoriesPreview();
    for (const CATEGORY of category) {
        const { id: ID, name: NAME } = CATEGORY;
        const CATEGORY_HTML = `<a id="category-id-${ID}" class="categories__category categories__category--action" href="#category=${ID}-${NAME}">${NAME}</a>`;
        container.innerHTML += CATEGORY_HTML;
    }
}
export function setGenericMoviesList(movies, container, carousel) {
    container.innerHTML = '';
    insertMovies(movies, container, carousel);
}
export async function setPaginatedMovieByScroll() {
    const { hash: HASH } = location;
    let rout = '';
    const config = {
        params: {
            page: numberPageMovies(),
            with_genres: '',
            query: ''
        }
    };
    const [HASH_NAME, EXTRA_INFO] = HASH.split('=');
    const HASHES_ROUTES = {
        '#trends': () => rout = 'trending/movie/day',
        '#category': () => {
            const [ID_CATEGORY] = EXTRA_INFO.split('-');
            rout = 'discover/movie';
            config.params.with_genres = ID_CATEGORY;
        },
        '#search': () => {
            const QUERY_SEARCH = EXTRA_INFO;
            rout = 'search/movie';
            config.params.query = QUERY_SEARCH;
        }
    };
    HASHES_ROUTES[HASH_NAME]();
    const RESPONSE = await api(rout, config);
    const DATA = RESPONSE.data;
    const MOVIES = DATA.results;
    const IS_MAX_PAGE = DATA.page > DATA.total_pages;
    if (IS_MAX_PAGE)
        return;
    const IS_CAROUSEL = false;
    insertMovies(MOVIES, GENERIC_LIST_CONTAINER, IS_CAROUSEL, { clean: false });
}
export function saveOrDeleteLikeMovieOnLocalStorage(movie) {
    const ID = movie.id;
    let likedMovieList = getLikedMovieListFromLocalStorage();
    const IS_REPEAT = likedMovieList[ID];
    likedMovieList[ID] = (IS_REPEAT)
        ? undefined
        : movie;
    likedMovieList = JSON.stringify(likedMovieList);
    localStorage.setItem('liked-movie', likedMovieList);
}
export function setLikedMoviesFromLocalStorage() {
    const IS_CAROUSEL = true;
    const LIKED_MOVIES = getLikedMovieListFromLocalStorage();
    const MOVIES = Object.values(LIKED_MOVIES);
    insertMovies(MOVIES, LIKED_MOVIE_CONTAINER, IS_CAROUSEL, { clean: true });
}
async function setLanguagesOnDataList() {
    const LANGUAGES = await getLanguageApi();
    for (let i = 1; i < LANGUAGES.length; i++) {
        const OPTION = document.createElement('option');
        OPTION.value = LANGUAGES[i].iso_639_1;
        OPTION.innerText = LANGUAGES[i].english_name;
        LANGUAGE_DATALIST.appendChild(OPTION);
    }
}
setLanguagesOnDataList();
//# sourceMappingURL=setData.mjs.map