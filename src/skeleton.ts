import { BUTTONS_GO_BACK, SEARCH_ICON } from './nodes.mjs';

export function skeletonMovieAndCategories (containerItems: HTMLElement[], movie: boolean, category: boolean, isCarousel: boolean): void {
	if (movie) {
		const ITEM_SKELETON = document.createElement('article') as HTMLElement;

		ITEM_SKELETON.className = (isCarousel)
			? 'carousel__item-skeleton'
			: 'carousel__item-generic-list-skeleton';

		for (let i = 0; i < 10; i++) {
			containerItems[0].append(ITEM_SKELETON.cloneNode(true));
		}
	}

	if (category) {
		const CATEGORY_SKELETON = document.createElement('div') as HTMLDivElement;

		CATEGORY_SKELETON.classList.add('categories__category-skeleton');

		for (let i = 0; i < 10; i++) {
			containerItems[1].append(CATEGORY_SKELETON.cloneNode(true));
		}
	}
}

export function removeSkeleton (): void {
	if (location.hash.startsWith('#home')) {
		SEARCH_ICON.classList.remove('header__search-icon-skeleton');
		SEARCH_ICON.innerText = 'search';
		BUTTONS_GO_BACK[0].classList.remove('header__arrow-left-skeleton');
		BUTTONS_GO_BACK[0].innerText = 'chevron_left';
	}
}

export function removeSkeletonGoBackButton (): void {
	if (location.hash.startsWith('#search=') || location.hash.startsWith('#category=') || location.hash.startsWith('#trends')) {
		SEARCH_ICON.classList.remove('header__search-icon-skeleton');
		SEARCH_ICON.innerText = 'search';
		BUTTONS_GO_BACK[0].classList.remove('header__arrow-left-skeleton');
		BUTTONS_GO_BACK[0].innerText = 'chevron_left';
		BUTTONS_GO_BACK[1].classList.remove('header__arrow-left-skeleton');
		BUTTONS_GO_BACK[1].innerText = 'chevron_left';
	}
}
