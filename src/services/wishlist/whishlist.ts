import { Job } from '@/types/jobs';
import { AxiosInstance } from '../api';

export const addWishlist = (data: Job) => {
    return AxiosInstance.post('/user/addWishlist', { jobId: data?._id });
};

export const removeWishlist = (data: Job) => {
    return AxiosInstance.delete('/user/remove', {
        data: { jobId: data._id },
    });
};

export const getWishlist = ({ page = 1, limit = 10, search = '' }) => {
    return AxiosInstance.get('/user/wishlist', {
        params: { page, limit, search },
    });
};

export const addWorkerWishlist = (data: Job) => {
    return AxiosInstance.post('/user/addWishlist-worker', { workerId: data?._id });
};

export const removeWorkerWishlist = (data: Job) => {
    return AxiosInstance.delete('/user/remove-worker', {
        data: { workerId: data._id },
    });
};

export const getWorkerWishlist = ({ page = 1, limit = 10, search = '' }) => {
    return AxiosInstance.get('/user/wishlist-worker', {
        params: { page, limit, search },
    });
};