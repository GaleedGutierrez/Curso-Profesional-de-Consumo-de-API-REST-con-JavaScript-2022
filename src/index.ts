import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLikedMovieListFromLocalStorage } from './getData.mjs';
import { InterfaceAccount, InterfaceMovieSearch, InterfaceSessionApi, InterfaceStatusPostFavoriteMovie, InterfaceTheMovieDB, InterfaceTokenApi } from './interfaces.mjs';
import { amountLikedMovies, showLikedMovieSection, showMovieDetails } from './navigation.js';
import { $$, LIKED_MOVIE_SECTION } from './nodes.mjs';
import { LAZY_LOADER } from './observer.mjs';
import { saveLikeMovieOnLocalStorage } from './setData.mjs';
import { API_KEY, SESSION_ID, request_token } from './authentication.mjs';
import { api } from './api.mjs';

export const insertMovies = (
	movies: InterfaceMovieSearch[], container: HTMLElement, carousel: boolean,
	{
		clean = true
	} = {}): void => {

	if (clean)
		container.innerHTML = '';


	for (const MOVIE of movies) {
		createMovieBox(MOVIE, container, carousel);
	}

	// if (!carousel && clean && !IsButtonLoadMore) {
	// 	const BUTTON_LOAD_MORE = document.createElement('button') as HTMLButtonElement;

	// 	BUTTON_LOAD_MORE.innerText = 'CARGAR MÁS';
	// 	BUTTON_LOAD_MORE.className = 'generic-list__button main__button-see-more';
	// 	BUTTON_LOAD_MORE.addEventListener('click', getPaginatedTrendingMovies);
	// 	GENERIC_LIST.appendChild(BUTTON_LOAD_MORE);
	// 	IsButtonLoadMore = true;
	// }
};

const createMovieBox = (movie: InterfaceMovieSearch, container: HTMLElement, carousel: boolean): void => {
	// Create elements DOM
	const ARTICLE = document.createElement('article') as HTMLElement;
	const FIGURE = document.createElement('figure') as HTMLElement;
	const IMG = document.createElement('img') as HTMLImageElement;
	const LIKED_BUTTON = document.createElement('button') as HTMLButtonElement;
	const DATA_CONTAINER = document.createElement('div') as HTMLDivElement;

	// Data box movie
	const ID = movie.id;
	const TITLE = movie.title;
	const MOVIE_IMG = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
	const ALT_IMG = movie.title;
	const AGE = movie.release_date.split('-')[0];
	const VOTES = movie.vote_average.toFixed(2);

	// general variables
	const IS_LIKED = getLikedMovieListFromLocalStorage()[ID];

	// Add attributes
	ARTICLE.className = (carousel)
		? 'carousel__item generic-list__movie-container'
		: 'generic-list__movie-container';
	IMG.className = (carousel)
		? 'generic-list__img-carousel'
		: 'generic-list__img';
	IMG.setAttribute('data-alt-img', ALT_IMG);
	IMG.setAttribute('data-src-img', MOVIE_IMG);
	LIKED_BUTTON.className = (IS_LIKED)
		? 'material-icons liked-movie__button liked-movie__button--liked'
		: 'material-icons liked-movie__button';
	// getLikedMovieListFromLocalStorage()[ID] && LIKED_BUTTON.classList.add('liked-movie__button--liked');
	LIKED_BUTTON.innerText = (IS_LIKED)
		? 'favorite'
		: 'favorite_border';
	LIKED_BUTTON.setAttribute('data-id', ID.toString());
	DATA_CONTAINER.className = 'liked-movie__data';

	// addEventListers
	IMG.addEventListener('error', () => IMG.src = `https://via.placeholder.com/300x450/8b48bf/ffffff?text=sorry :(`
	);
	LIKED_BUTTON.addEventListener('click', () => clickLikeButton(LIKED_BUTTON, movie, container));
	DATA_CONTAINER.addEventListener('click', () => showMovieDetails(movie.id));

	// Append elements
	DATA_CONTAINER.innerHTML = `<div class="liked-movie__data-container">
		<h3 class="liked-movie__title">${TITLE}</h3>
		<div>
			<div class="liked-movie__info-movie-container">
				<p class="material-icons">star</p>
				<p>${VOTES}</p>
			</div>
			<p>${AGE}</p>
		</div>
	</div>`;
	FIGURE.append(IMG);
	ARTICLE.append(DATA_CONTAINER, FIGURE, LIKED_BUTTON);
	container.appendChild(ARTICLE);

	LAZY_LOADER.observe(IMG);
};

const clickLikeButton = (likedButton: HTMLButtonElement, movie: InterfaceMovieSearch, container: HTMLElement): void => {
	likedButton.classList.toggle('liked-movie__button--liked');

	const { hash: HASH } = location;
	const IS_LIKED = likedButton.classList.contains('liked-movie__button--liked');
	const IS_HOME = HASH === '#home';
	const CONTAINER_ID = container.getAttribute('id');
	const IS_CLICK_ON_FAVORITE_SECTION = CONTAINER_ID === 'main__liked-movie-list-container-id';

	likedButton.innerText = (IS_LIKED)
		? 'favorite'
		: 'favorite_border';

	saveLikeMovieOnLocalStorage(movie);

	const AMOUNT_MOVIES_NOT_ZERO = amountLikedMovies() !== 0;

	if (AMOUNT_MOVIES_NOT_ZERO && IS_HOME) {
		showLikedMovieSection();
	} else {
		LIKED_MOVIE_SECTION.classList.add('hidden');
	}

	if (IS_CLICK_ON_FAVORITE_SECTION) {
		const LIKED_BUTTON_ID = likedButton.getAttribute('data-id');
		const NODES_LIKED_BUTTON_TRENDS = $$('#main__carousel-container-id .liked-movie__button--liked') as NodeListOf<HTMLButtonElement>;
		const LIKED_BUTTON_TRENDS = Array.from(NODES_LIKED_BUTTON_TRENDS) as HTMLButtonElement[];
		const BUTTON_SIMILAR = LIKED_BUTTON_TRENDS.find((btn: HTMLButtonElement) => btn.getAttribute('data-id') === LIKED_BUTTON_ID) as HTMLButtonElement;

		BUTTON_SIMILAR.classList.remove('liked-movie__button--liked');
		BUTTON_SIMILAR.innerText = 'favorite_border';
	}
};

const getRequestToken = async (): Promise<string> => {
	const RESPONSE: AxiosResponse = await api('authentication/token/new');
	const DATA: InterfaceTokenApi = RESPONSE.data;
	const REQUEST_TOKEN = DATA.request_token;

	return REQUEST_TOKEN;
};

const getSession = async () => {
	const config: AxiosRequestConfig = {
		params : { request_token }
	};
	// *Tenemos que aceptar, en nuestra cuenta de The Movie DB, la autenticación de terceros en https://www.themoviedb.org/authenticate/{request_token}
	const RESPONSE: AxiosResponse = await api('authentication/session/new', config);
	const DATA: InterfaceSessionApi = RESPONSE.data;
	const SESSION_ID = DATA.session_id;

	return SESSION_ID;
};

const getAccountId = async () => {
	const session_id = SESSION_ID;
	const config: AxiosRequestConfig = {
		params : { session_id }
	};
	const RESPONSE: AxiosResponse = await api('account', config);
	const ACCOUNT: InterfaceAccount = RESPONSE.data;
	const ID = ACCOUNT.id;

	return ID;
};

const addOrDeleteFavoriteMovie = async ({ media_id, remove = false }: { media_id: number, remove?: boolean }) => {
	// Si queremos eliminar la película de favoritos tenemos que pasar el parámetro favorite = false;
	const session_id = SESSION_ID;
	const media_type = 'movie';
	const favorite = !remove;
	const ACCOUNT_ID = await getAccountId();
	const config: AxiosRequestConfig = {
		method : 'POST',
		params : { session_id },
		data   : {
			media_type,
			media_id,
			favorite
		}
	};
	const RESPONSE: AxiosResponse = await api(`account/${ACCOUNT_ID}/favorite`, config);
	const STATUS: InterfaceStatusPostFavoriteMovie = RESPONSE.data;

	return STATUS;
};

const getFavoriteMovies = async () => {
	const session_id = SESSION_ID;
	const ACCOUNT_ID = await getAccountId();
	const config: AxiosRequestConfig = {
		params : { session_id }
	};
	const RESPONSE: AxiosResponse = await api(`account/${ACCOUNT_ID}/favorite/movies`, config);
	const DATA: InterfaceTheMovieDB = RESPONSE.data;
	const MOVIES = DATA.results;

	return MOVIES;
};

// console.log(await getRequestToken());
// console.log(await getSession());
// console.log(await getAccountId());
// console.log(await addOrDeleteFavoriteMovie({ media_id: 937278, remove: true }));
// console.log(await getFavoriteMovies());





