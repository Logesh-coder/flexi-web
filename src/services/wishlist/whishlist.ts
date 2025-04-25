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