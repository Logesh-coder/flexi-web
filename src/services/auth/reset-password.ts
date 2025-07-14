import { AxiosInstance } from '../api';

interface ResetFormValues {
    password: string;
    confirmPassword: string;
}

const resetPasswordService = async (data: ResetFormValues) => {
    const res = AxiosInstance.put('/user/reset-password', data);
    return res;
};

export default resetPasswordService;
