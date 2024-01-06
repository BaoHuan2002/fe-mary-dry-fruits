import axios from 'axios';

//Base URL
const instance = axios.create({
    baseURL: 'https://maru-dry-fruits-adminpage.up.railway.app',
    // baseURL: 'http://localhost:8000',
});

//Setup add JWT on header request
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

instance.interceptors.request.use(
    function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default instance;
