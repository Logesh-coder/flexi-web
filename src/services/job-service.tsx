import { Job } from '@/types/jobs';
import { AxiosInstance } from './api';

const jobService = (data: Job) => {
    const res = AxiosInstance.post('/user/job-add', data);
    return res;
};

export default jobService;
