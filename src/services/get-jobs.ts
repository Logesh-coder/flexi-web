import { AxiosInstance } from './api';

interface JobFiltersProps {
    city: string;
    area: string;
    date: string;
    minBudget: string;
    maxBudget: string;
    search?: string;
    page?: number;
    limit?: number;
}

const getJobService = (filters: JobFiltersProps) => {

    const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== '' && value !== undefined)
    );

    const res = AxiosInstance.get('/user/job', {
        params: cleanedFilters,
    });

    return res;
};
export default getJobService;