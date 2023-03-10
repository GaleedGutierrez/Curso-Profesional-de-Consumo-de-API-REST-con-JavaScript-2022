import { API_KEY } from './authentication.mjs';
const config = {
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        api_key: API_KEY
    }
};
const api = axios.create(config);
export default api;
//# sourceMappingURL=api.mjs.map