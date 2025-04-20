import { AxiosInstance } from './api';

const getSingleWorkerService = (slug: string) => {

    const res = AxiosInstance.get(`/user/worker/${slug}`);

    return res;
};
export default getSingleWorkerService;