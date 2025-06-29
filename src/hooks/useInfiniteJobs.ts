import getJobService from '@/services/get-jobs';
import { JobFiltersProps } from '@/types/jobs';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfiniteJobs(filters: JobFiltersProps, enabled = true) {
    const LIMIT = parseInt(process.env.NEXT_PUBLIC_PAGELIMIT || '6', 10);

    return useInfiniteQuery({
        queryKey: ['jobs', filters],
        queryFn: ({ pageParam = 1 }) =>
            getJobService({ ...filters, page: pageParam, limit: LIMIT }),
        getNextPageParam: (lastPage, _, lastPageParam) => {
            const totalPages = lastPage.pages || 1;
            return lastPageParam < totalPages ? lastPageParam + 1 : undefined;
        },
        initialPageParam: 1,
        enabled,
        staleTime: 5 * 60 * 1000,
    });
}
