import { API_KEY, SESSION_ID, request_token } from '../authentication.mjs';
const getRequestToken = async () => {
    const REQUEST_TOKEN_URL = 'authentication/token/new';
    const init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    const RESPONSE = await fetch(`${URL}/${REQUEST_TOKEN_URL}?api_key=${API_KEY}`, init);
    const DATA = await RESPONSE.json();
    const REQUEST_TOKEN = DATA.request_token;
    return REQUEST_TOKEN;
};
const getSession = async () => {
    // eslint-disable-next-line camelcase
    const SESSION_ID_URL = 'authentication/session/new';
    const REQUEST_BODY = JSON.stringify({
        request_token
    });
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: REQUEST_BODY
    };
    // *Tenemos que aceptar, en nuestra cuenta de The Movie DB, la autenticación de terceros en https://www.themoviedb.org/authenticate/{request_token}
    const RESPONSE = await fetch(`${URL}/${SESSION_ID_URL}?api_key=${API_KEY}`, init);
    const DATA = await RESPONSE.json();
    const SESSION_ID = DATA.session_id;
    return SESSION_ID;
};
const getAccountId = async () => {
    const ACCOUNT_URL = 'account';
    const init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    };
    const RESPONSE = await fetch(`${URL}/${ACCOUNT_URL}?api_key=${API_KEY}&session_id=${SESSION_ID}`, init);
    const ACCOUNT = await RESPONSE.json();
    const ID = ACCOUNT.id;
    return ID;
};
const addOrDeleteFavoriteMovie = async ({ media_id, remove = false }) => {
    const media_type = 'movie';
    const favorite = !remove;
    const ACCOUNT_ID = await getAccountId();
    const REQUEST_BODY = JSON.stringify({
        media_type,
        media_id,
        favorite
    });
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: REQUEST_BODY
    };
    const RESPONSE = await fetch(`${URL}/account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`, init);
    const STATUS = await RESPONSE.json();
    return STATUS;
};
const getFavoriteMovies = async () => {
    const ACCOUNT_ID = await getAccountId();
    const init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    const RESPONSE = await fetch(`${URL}/account/${ACCOUNT_ID}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}`, init);
    const DATA = await RESPONSE.json();
    const MOVIES = DATA.results;
    return MOVIES;
};
const URL = 'https://api.themoviedb.org/3';
//# sourceMappingURL=addFavoriteMovieByFetch.js.map