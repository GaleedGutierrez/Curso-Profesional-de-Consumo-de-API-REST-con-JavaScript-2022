/* eslint-disable padding-line-between-statements */
const $ = (selector: string) => document.querySelector(selector);
export const $$ = (selector: string) => document.querySelectorAll(selector);

// Body

// Header
export const HEADER_MAIN = $('#header__main-id') as HTMLElement;
export const HEADER_TITLE = $('#header__title-id') as HTMLHeadingElement;
export const HEADER_CATEGORY = $('#header__category-id') as HTMLElement;
export const SEARCH_FORM = $('#header__search-form-id') as HTMLFormElement;
export const SEARCH_INPUT = $('#header__search-input-id') as HTMLInputElement;
export const TITLE_CATEGORY = $('#category-movie__title-id') as HTMLHeadingElement;
export const BUTTON_SEARCH = $('#header__button-search-id') as HTMLButtonElement;
export const BUTTONS_GO_BACK = Array.from($$('.header__arrow-left')) as HTMLButtonElement[];
export const SEARCH_ICON = $('#header__search-icon-id') as HTMLSpanElement;
export const LANGUAGE_CONTAINER = $('#header__languages-container-id') as HTMLDivElement;
export const CHANGE_LANGUAGE_CONTAINER = $('#languages-container__form-button-container-id') as HTMLButtonElement;
export const BUTTON_CHANGE_LANGUAGE = $('#languages-container__button-id') as HTMLButtonElement;
export const LANGUAGE_DATALIST = $('#language') as HTMLDataListElement;
export const BUTTON_CURRENT_LANGUAGE = $('#header__current-language-button-id') as HTMLButtonElement;
export const INPUT_CHANGE_LANGUAGE = $('#header__input-language') as HTMLInputElement;

// Trending preview
export const TRENDING_PREVIEW = $('#main__trending-preview-id') as HTMLElement;
export const CAROUSEL_CONTAINER = $('#main__carousel-container-id') as HTMLDivElement;
export const BUTTON_TREADING = $('#trending-preview-header__button-id') as HTMLButtonElement;

// Categories section
export const CATEGORIES_SECTION = $('#main__categories-container-id') as HTMLElement;
export const CATEGORIES_CONTAINER = $('#main__categories-id') as HTMLElement;

// Movie details section
export const MOVIE_DETAILS = $('#main__movie-details-id') as HTMLElement;

// Similar movies
export const SIMILAR_MOVIES = $('#main__similar-movies-id') as HTMLElement;
export const SIMILAR_MOVIES_CAROUSEL = $('#similar-movies__carousel-container-id') as HTMLElement;
export const SIMILAR_MOVIES_SCROLL = $('#similar-movies__carousel-scroll-id') as HTMLElement;

// Generic carousel movies
export const GENERIC_LIST = $('#main__generic-list-id') as HTMLElement;
export const GENERIC_LIST_CONTAINER = $('#generic-list__container-id') as HTMLElement;

// Liked Movies
export const LIKED_MOVIE_SECTION = $('#main__liked-section-id') as HTMLElement;
export const LIKED_MOVIE_CONTAINER = $('#main__liked-movie-list-container-id') as HTMLElement;
