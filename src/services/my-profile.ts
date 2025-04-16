import { AxiosInstance } from './api';

const myProfile = () => {
    const res = AxiosInstance.get('/user/profile');

    return res;
};

export default myProfile;