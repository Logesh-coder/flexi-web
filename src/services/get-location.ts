import { AxiosInstance } from "./api";

export const getLocationService = () => {
    return AxiosInstance.get('/user/location');
};
