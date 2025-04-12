import { auth } from '@/types/auth';
import { AxiosInstance } from '../api';

const forgotService = (data: auth) => {
    const res = AxiosInstance.post('/user/forgot-password', data);
    return res;
};

export default forgotService;