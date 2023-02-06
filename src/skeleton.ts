import { BUTTONS_GO_BACK, SEARCH_ICON } from './nodes.mjs';

export const skeletonMovieAndCategories = (containerItems: HTMLElement[], movie: boolean, category: boolean, isCarousel: boolean) => {
	if (movie) {
		const ITEM_SKELETON = document.createElement('article');

		if (isCarousel) {
			ITEM_SKELETON.classList.add('carousel__item-skeleton');
		} else {
			ITEM_SKELETON.classList.add('carousel__item-generic-list-skeleton');
		}

		for (let i = 0; i < 10; i++) {
			containerItems[0].append(ITEM_SKELETON.cloneNode(true));
		}
	}

	if (category) {
		const CATEGORY_SKELETON = document.createElement('div');

		CATEGORY_SKELETON.classList.add('categories__category-skeleton');


		for (let i = 0; i < 10; i++) {
			containerItems[1].append(CATEGORY_SKELETON.cloneNode(true));
		}
	}
};

export const removeSkeleton = () => {
	if (location.hash.startsWith('#home')) {
		SEARCH_ICON.classList.remove('header__search-icon-skeleton');
		SEARCH_ICON.innerText = 'search';
		BUTTONS_GO_BACK[0].classList.remove('header__arrow-left-skeleton');
		BUTTONS_GO_BACK[0].innerText = 'chevron_left';
	}
};

export const removeSkeletonGoBackButton = () => {
	if (location.hash.startsWith('#search=') || location.hash.startsWith('#category=')) {
		BUTTONS_GO_BACK[1].classList.remove('header__arrow-left-skeleton');
		BUTTONS_GO_BACK[1].innerText = 'chevron_left';
	}
};
