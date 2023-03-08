import { API_KEY } from './authentication.mjs';

// FIXME: Comentar la importación de Axios cada vez que se guarden cambios.
// import axios from 'axios';
import { AxiosInstance, CreateAxiosDefaults } from 'axios';

const config: CreateAxiosDefaults = {
	baseURL : 'https://api.themoviedb.org/3/',
	headers : {
		'Content-Type' : 'application/json;charset=utf-8'
	},
	params : {
		api_key : API_KEY
	}
};

const api: AxiosInstance = axios.create(config);

export default api;
