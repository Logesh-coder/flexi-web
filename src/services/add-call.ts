import { AxiosInstance } from './api';

const addCall = (data: any) => {
    const res = AxiosInstance.post('/user/call', data);
    return res;
};

const getJobCall = (page = 1, limit = 10) =>
    AxiosInstance.get('/user/called-jobs', {
        params: { page, limit }
    });

const getWorkersCall = (page = 1, limit = 10) =>
    AxiosInstance.get('/user/called-workers', {
        params: { page, limit }
    });

export { addCall, getJobCall, getWorkersCall };

