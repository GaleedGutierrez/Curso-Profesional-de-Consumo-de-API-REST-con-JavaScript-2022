/* eslint-disable padding-line-between-statements */
const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
// Body
// Header
export const HEADER_MAIN = $('#header__main-id');
export const HEADER_TITLE = $('#header__title-id');
export const HEADER_CATEGORY = $('#header__category-id');
export const SEARCH_FORM = $('#header__search-form-id');
export const SEARCH_INPUT = $('#header__search-input-id');
export const TITLE_CATEGORY = $('#category-movie__title-id');
export const BUTTON_SEARCH = $('#header__button-search-id');
export const BUTTONS_GO_BACK = Array.from($$('.header__arrow-left'));
export const SEARCH_ICON = $('#header__search-icon-id');
export const LANGUAGE_CONTAINER = $('#header__languages-container-id');
export const CHANGE_LANGUAGE_CONTAINER = $('#languages-container__form-button-container-id');
export const BUTTON_CHANGE_LANGUAGE = $('#languages-container__button-id');
export const LANGUAGE_DATALIST = $('#language');
export const BUTTON_CURRENT_LANGUAGE = $('#header__current-language-button-id');
export const INPUT_CHANGE_LANGUAGE = $('#header__input-language');
// Trending preview
export const TRENDING_PREVIEW = $('#main__trending-preview-id');
export const CAROUSEL_CONTAINER = $('#main__carousel-container-id');
export const BUTTON_TREADING = $('#trending-preview-header__button-id');
// Categories section
export const CATEGORIES_SECTION = $('#main__categories-container-id');
export const CATEGORIES_CONTAINER = $('#main__categories-id');
// Movie details section
export const MOVIE_DETAILS = $('#main__movie-details-id');
// Similar movies
export const SIMILAR_MOVIES = $('#main__similar-movies-id');
export const SIMILAR_MOVIES_CAROUSEL = $('#similar-movies__carousel-container-id');
export const SIMILAR_MOVIES_SCROLL = $('#similar-movies__carousel-scroll-id');
// Generic carousel movies
export const GENERIC_LIST = $('#main__generic-list-id');
export const GENERIC_LIST_CONTAINER = $('#generic-list__container-id');
// Liked Movies
export const LIKED_MOVIE_SECTION = $('#main__liked-section-id');
export const LIKED_MOVIE_CONTAINER = $('#main__liked-movie-list-container-id');
// Footer
export const FOOTER = $('#footer-id');
//# sourceMappingURL=nodes.mjs.map