import { Job } from '@/types/jobs';
import { AxiosInstance } from './api';

const jobUpdateService = (slug: any, data: Job) => {
    const res = AxiosInstance.put(`/user/job/${slug}`, data);
    return res;
};


export default jobUpdateService;
