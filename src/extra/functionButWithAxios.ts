const clickLikeButton = async (likedButton: HTMLButtonElement, movie: InterfaceMovieSearch, container: HTMLElement): Promise<void> => {
	likedButton.classList.toggle('liked-movie__button--liked');

	const { hash: HASH } = location;
	const IS_LIKED = likedButton.classList.contains('liked-movie__button--liked');
	const IS_HOME = HASH === '#home';
	const CONTAINER_ID = container.getAttribute('id');
	const IS_CLICK_ON_FAVORITE_SECTION = CONTAINER_ID === 'main__liked-movie-list-container-id';
	const ID_MOVIE = movie.id;

	likedButton.innerText = (IS_LIKED)
		? 'favorite'
		: 'favorite_border';

	await addOrDeleteFavoriteMovie({ media_id: ID_MOVIE, remove: !IS_LIKED });

	const LIST_MOVIES = await getFavoriteMovies();
	const AMOUNT_MOVIES_NOT_ZERO = LIST_MOVIES.length !== 0;

	if (AMOUNT_MOVIES_NOT_ZERO && IS_HOME) {
		showLikedMovieSection();
	} else {
		LIKED_MOVIE_SECTION.classList.add('hidden');
	}

	if (IS_CLICK_ON_FAVORITE_SECTION && AMOUNT_MOVIES_NOT_ZERO) {
		const LIKED_BUTTON_ID = likedButton.getAttribute('data-id');
		const NODES_LIKED_BUTTON_TRENDS = $$('#main__carousel-container-id .liked-movie__button--liked') as NodeListOf<HTMLButtonElement>;
		const LIKED_BUTTON_TRENDS = Array.from(NODES_LIKED_BUTTON_TRENDS) as HTMLButtonElement[];
		const BUTTON_SIMILAR = LIKED_BUTTON_TRENDS.find((btn: HTMLButtonElement) => btn.getAttribute('data-id') === LIKED_BUTTON_ID) as HTMLButtonElement;

		BUTTON_SIMILAR.classList.remove('liked-movie__button--liked');
		BUTTON_SIMILAR.innerText = 'favorite_border';
	}
};

// const getRequestToken = async (): Promise<string> => {
// 	const RESPONSE: AxiosResponse = await api('authentication/token/new');
// 	const DATA: InterfaceTokenApi = RESPONSE.data;
// 	const REQUEST_TOKEN = DATA.request_token;

// 	return REQUEST_TOKEN;
// };

// const getSession = async () => {
// 	const config: AxiosRequestConfig = {
// 		params : { request_token }
// 	};
// 	// *Tenemos que aceptar, en nuestra cuenta de The Movie DB, la autenticación de terceros en https://www.themoviedb.org/authenticate/{request_token}
// 	const RESPONSE: AxiosResponse = await api('authentication/session/new', config);
// 	const DATA: InterfaceSessionApi = RESPONSE.data;
// 	const SESSION_ID = DATA.session_id;

// 	return SESSION_ID;
// };

export const getAccountId = async () => {
	const session_id = SESSION_ID;
	const config: AxiosRequestConfig = {
		params : { session_id }
	};
	const RESPONSE: AxiosResponse = await api('account', config);
	const ACCOUNT: InterfaceAccount = RESPONSE.data;
	const ID = ACCOUNT.id;

	return ID;
};

export const getFavoriteMovies = async () => {
	const session_id = SESSION_ID;
	const config: AxiosRequestConfig = {
		params : { session_id }
	};
	const RESPONSE: AxiosResponse = await api(`account/${ACCOUNT_ID}/favorite/movies`, config);
	const DATA: InterfaceTheMovieDB = RESPONSE.data;
	const MOVIES = DATA.results;

	return MOVIES;
};

const addOrDeleteFavoriteMovie = async ({ media_id, remove = false }: { media_id: number, remove?: boolean }) => {
	// Si queremos eliminar la película de favoritos tenemos que pasar el parámetro favorite = false;
	const session_id = SESSION_ID;
	const media_type = 'movie';
	const favorite = !remove;
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






export const ACCOUNT_ID = await getAccountId();



export const setLikedMoviesFromAPI = async (): Promise<void> => {
	const IS_CAROUSEL = true;
	const MOVIES = await getFavoriteMovies();

	insertMovies(MOVIES, LIKED_MOVIE_CONTAINER, IS_CAROUSEL, { clean: true });
};
