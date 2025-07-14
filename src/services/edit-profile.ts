import { AxiosInstance } from './api';

interface ProfileFormValues {
    name: string;
    email: string;
    mobile: string;
    date_of_birth: string;
    domain: string;
    salary: string;
    city: string;
    area: string;
    isActive?: boolean;
}



const editProfile = (data: ProfileFormValues) => {
    const res = AxiosInstance.put('/user/edit-profile', data);
    return res;
};

export default editProfile;
