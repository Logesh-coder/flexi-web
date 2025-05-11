import { AxiosInstance } from './api';

const getSingleJobService = (slug: any) => {

    const res = AxiosInstance.get(`/user/job/${slug}`);

    return res;
};
export default getSingleJobService;