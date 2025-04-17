import { AxiosInstance } from './api';

interface Profile {
    name?: string;
    mobile?: number;
    date_of_birth?: string;
    instaProfileLink?: string;
}


const editProfile = (data: Profile) => {
    const res = AxiosInstance.put('/user/edit-profile', data);
    return res;
};

export default editProfile;
