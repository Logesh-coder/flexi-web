// hooks/useInfiniteWorkers.ts
import getWorkersService from '@/services/workers';
import { WorkerFiltersProps, WorkerResponse } from '@/types/workers';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfiniteWorkers(filters: Omit<WorkerFiltersProps, 'page' | 'limit'>, enabled = true) {
    const LIMIT = parseInt(process.env.NEXT_PUBLIC_PAGELIMIT || '6', 10);

    return useInfiniteQuery<WorkerResponse, Error>({
        queryKey: ['workers', filters],
        queryFn: ({ pageParam = 1 }) => {
            const page = pageParam as number; // ✅ cast unknown to number
            return getWorkersService({ ...filters, page, limit: LIMIT });
        },

        getNextPageParam: (lastPage, _, page) => {
            const currentPage = page as number;
            const totalPages = lastPage.pages || 1;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },

        initialPageParam: 1,
        enabled,
        staleTime: 5 * 60 * 1000,
    });
}
