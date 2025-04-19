import { AxiosInstance } from './api';

interface WorkerFiltersProps {
    city: string;
    area: string;
    minBudget: string;
    maxBudget: string;
    search?: string;
    page?: number;
    limit?: number;
}

const getWorkersService = (filters: WorkerFiltersProps) => {

    const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== '' && value !== undefined)
    );

    const res = AxiosInstance.get('/user/workers', {
        params: cleanedFilters,
    });

    return res;
};
export default getWorkersService;