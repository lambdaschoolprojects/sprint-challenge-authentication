import axios from 'axios';
import * as helpers from './handleToken';

const instance = axios.create({
    baseURL: 'http://localhost:3300/api'
});

instance.interceptors.request.use(
    config => {
        config.headers.authorization = helpers.getToken();

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

export default instance;