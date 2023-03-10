import api from './api.mjs';
import { setPaginatedMovieByScroll } from './setData.mjs';
import { language } from './navigation.js';
export async function getTrendingMoviesPreview() {
    const config = { params: { language } };
    const RESPONSE = await api('trending/movie/day', config);
    const DATA = RESPONSE.data;
    const MOVIES = DATA.results;
    return MOVIES;
}
export async function getCategoriesPreview() {
    const config = { params: { language } };
    const RESPONSE = await api(`genre/movie/list`, config);
    const DATA = RESPONSE.data;
    const CATEGORIES = DATA.genres;
    return CATEGORIES;
}
export async function getMoviesByCategory(id) {
    const config = {
        params: {
            with_genres: id,
            language
        }
    };
    const RESPONSE = await api('discover/movie', config);
    const DATA = RESPONSE.data;
    const MOVIES = DATA.results;
    return MOVIES;
}
export async function getMovieBySearch(query) {
    const config = {
        params: {
            query
        }
    };
    const RESPONSE = await api('search/movie', config);
    const DATA = RESPONSE.data;
    const MOVIES = DATA.results;
    return MOVIES;
}
export async function getMovieById(id) {
    const config = { params: { language } };
    const RESPONSE = await api(`movie/${id}`, config);
    const MOVIE = RESPONSE.data;
    return MOVIE;
}
export async function getRelatedMoviesId(id) {
    const RESPONSE = await api(`movie/${id}/recommendations`);
    const DATA = RESPONSE.data;
    const RELATED_MOVIES = DATA.results;
    return RELATED_MOVIES;
}
export function getPaginatedMovies() {
    const { scrollTop: SCROLL_TOP, scrollHeight: SCROLL_HEIGHT, clientHeight: CLIENT_HEIGHT } = document.documentElement;
    const IS_SCROLL_BOTTOM = (SCROLL_TOP + CLIENT_HEIGHT) >= (SCROLL_HEIGHT - 15);
    const [HASH] = location.hash.split('=');
    const IS_NOT_HOME_AND_MOVIE = HASH !== '#home' && HASH !== '#movie';
    if (IS_SCROLL_BOTTOM && IS_NOT_HOME_AND_MOVIE)
        setPaginatedMovieByScroll();
}
export function getLikedMovieListFromLocalStorage() {
    const MOVIES_LIST = localStorage.getItem('liked-movie');
    const MOVIES = (MOVIES_LIST)
        ? JSON.parse(MOVIES_LIST)
        : {};
    return MOVIES;
}
export function currentPageMoviesUpdate() {
    let pageMovies = 1;
    return function (refresh = false) {
        pageMovies = (refresh)
            ? 1
            : pageMovies + 1;
        return pageMovies;
    };
}
export async function getLanguageApi() {
    const RESPONSE = await api('configuration/languages');
    const LANGUAGES = RESPONSE.data;
    return LANGUAGES;
}
//# sourceMappingURL=getData.mjs.map