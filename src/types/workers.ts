export interface WorkerFiltersProps {
    city: string;
    area: string;
    minBudget: string;
    maxBudget: string;
    search?: string;
    page?: number;
    limit?: number;
}

export interface Worker {
    _id: string;
    name: string;
    // other fields...
}

export interface WorkerResponse {
    workers: Worker[];
    pages: number;
}
