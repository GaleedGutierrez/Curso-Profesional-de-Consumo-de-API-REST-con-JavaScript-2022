import API_KEY from './authentication.mjs';

// FIXME: Comentar la importación de Axios cada vez que se guarden cambios.
// import axios from 'axios';

export const api = axios.create({
	baseURL : 'https://api.themoviedb.org/3/',
	headers : {
		'Content-Type' : 'application/json;charset=utf-8'
	},
	params : {
		api_key : API_KEY
	}
});
