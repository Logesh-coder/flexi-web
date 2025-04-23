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

export const getWishlist = () => {
    return AxiosInstance.get('/user/wishlist');
};
