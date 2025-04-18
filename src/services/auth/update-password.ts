import { AxiosInstance } from '../api';

interface PasswordUpdate {
    currentPassword: string;
    newPassword: string;
}

const updatePasswordService = (data: PasswordUpdate) => {
    const res = AxiosInstance.put('/user/update-password', data);
    return res;
};

export default updatePasswordService;
