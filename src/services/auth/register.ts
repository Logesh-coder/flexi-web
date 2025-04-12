import { auth } from '@/types/auth';
import { AxiosInstance } from '../api';

const registerService = (data: auth) => {
    const res = AxiosInstance.post('/user/register', data);
    return res;
};

export default registerService;
