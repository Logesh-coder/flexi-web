import { auth } from '@/types/auth';
import { AxiosInstance } from '../api';

const resetPasswordService = (data: auth) => {
    const res = AxiosInstance.post('/user/reset-password', data);
    return res;
};

export default resetPasswordService;
