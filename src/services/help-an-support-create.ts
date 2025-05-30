import { AxiosInstance } from './api';

const HelpAnSupportCreate = (data: any) => {
    const res = AxiosInstance.post('/user/help-support', data);
    return res;
};

export default HelpAnSupportCreate;
