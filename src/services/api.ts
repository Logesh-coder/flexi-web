import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log('API_URL', API_URL);

export const AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true,
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('TOKEN');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const FormAxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

FormAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('TOKEN');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            (error.response &&
                error.response.data.status === 'error' &&
                error.response.data.message === 'Invalid or expired token') ||
            error.response.status === 401
        ) {
            localStorage.removeItem('TOKEN');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
