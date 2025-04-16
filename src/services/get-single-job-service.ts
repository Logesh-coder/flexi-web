import { AxiosInstance } from './api';

const getSingleJobService = (slug: string) => {

    const res = AxiosInstance.get(`/user/job/${slug}`);

    return res;
};
export default getSingleJobService;