import { auth } from '@/types/auth';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const loginService = (data: auth) => {
    const res = axios.post(`${API_URL}/user/login`, data);
    return res;
};

export default loginService;
