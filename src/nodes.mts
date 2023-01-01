/* eslint-disable padding-line-between-statements */
const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

// Header
export const HEADER_MAIN = $('#header__main-id') as HTMLElement;
export const HEADER_TITLE = $('#header__title-id') as HTMLHeadingElement;
export const HEADER_CATEGORY = $('#header__category-id') as HTMLElement;
export const SEARCH_FORM = $('#header__search-form-id') as HTMLFormElement;
export const SEARCH_INPUT = $('#header__search-input-id') as HTMLInputElement;
export const TITLE_CATEGORY = $('#category-movie__title-id') as HTMLHeadingElement;
export const BUTTON_SEARCH = $('#header__button-search-id') as HTMLButtonElement;
export const BUTTONS_GO_BACK = Array.from($$('.header__arrow-left')) as HTMLButtonElement[];

// Trending preview
export const TRENDING_PREVIEW = $('#main__trending-preview-id') as HTMLElement;
export const CAROUSEL_CONTAINER = $('#main__carousel-container-id') as HTMLDivElement;
export const BUTTON_TREADING = $('#trending-preview-header__button-id') as HTMLButtonElement;

// Categories section
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

