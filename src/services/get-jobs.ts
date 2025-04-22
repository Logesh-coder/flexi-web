import { AxiosInstance } from './api';

interface JobFiltersProps {
    city?: string;
    area?: string;
    date?: string;
    minBudget?: string;
    maxBudget?: string;
    search?: string;
    page?: number;
    limit?: number;
    id?: string;
}

const getJobService = (filters: JobFiltersProps) => {
    const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '' && value !== undefined)
    );

    return AxiosInstance.get('/user/job', {
        params: cleanedFilters,
    });
};

export default getJobService;
