import { Job } from '@/types/jobs';
import { AxiosInstance } from '../api';

export const addWishlist = (data: Job) => {
    const id = data?._id || data?.jobId;
    return AxiosInstance.post('/user/addWishlist', { jobId: id });
};

export const removeWishlist = (data: Job) => {
    const id = data?._id || data?.jobId;

    return AxiosInstance.delete('/user/remove', {
        data: { jobId: id },
    });
};

export const getWishlist = ({ page = 1, limit = 10, search = '' }) => {
    return AxiosInstance.get('/user/wishlist', {
        params: { page, limit, search },
    });
};

export const addWorkerWishlist = (data: Job) => {
    const id = data?._id || data?.workerId;

    return AxiosInstance.post('/user/addWishlist-worker', { workerId: id });
};

export const removeWorkerWishlist = (data: Job) => {
    const id = data?._id || data?.workerId;

    return AxiosInstance.delete('/user/remove-worker', {
        data: { workerId: id },
    });
};

export const getWorkerWishlist = ({ page = 1, limit = 10, search = '' }) => {
    return AxiosInstance.get('/user/wishlist-worker', {
        params: { page, limit, search },
    });
};