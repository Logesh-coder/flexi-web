import { AxiosInstance } from './api';

const addCall = (data: any) => {
    const res = AxiosInstance.post('/user/call', data);
    return res;
};

const getJobCall = () => {
    const res = AxiosInstance.get('/user/called-jobs');
    return res;
};

const getWorkersCall = () => {
    const res = AxiosInstance.get('/user/called-workers');
    return res;
};

export { addCall, getJobCall, getWorkersCall };

