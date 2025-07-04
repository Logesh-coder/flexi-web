// services/workers.ts
import { AxiosInstance } from './api';

export interface Worker {
    _id: string;
    name: string;
    domain: string;
}

export interface WorkerFiltersProps {
    city?: string;
    area?: string;
    minBudget?: string;
    maxBudget?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export interface WorkerResponse {
    workers: Worker[];
    pages: number;
}

const getWorkersService = async (
    filters: WorkerFiltersProps
): Promise<WorkerResponse> => {
    const cleaned = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined)
    );
    const res = await AxiosInstance.get('/user/workers', { params: cleaned });
    return res.data.data;
};

export default getWorkersService;
