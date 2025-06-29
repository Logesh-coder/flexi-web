// services/get-jobs.ts
import { JobFiltersProps } from '@/types/jobs';
import { AxiosInstance } from './api';


const getJobService = async (filters: JobFiltersProps) => {
    const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '' && value !== undefined)
    );

    const response = await AxiosInstance.get('/user/job', {
        params: cleanedFilters,
    });

    return response.data?.data; // Expected structure: { jobs: [], pages: number }
};

export default getJobService;
