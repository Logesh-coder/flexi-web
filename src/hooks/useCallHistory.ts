// hooks/useCallHistory.ts

import { getJobCall, getWorkersCall } from '@/services/add-call';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useCallHistory = (tab: 'job' | 'worker') => {
    return useInfiniteQuery({
        queryKey: ['call-history', tab] as const,
        queryFn: ({ pageParam = 1 }) =>
            tab === 'job'
                ? getJobCall(pageParam, 10)
                : getWorkersCall(pageParam, 10),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.data.hasNextPage ? lastPage.data.nextPage : undefined,
        select: (infiniteData) => ({
            pages: infiniteData.pages.flatMap((p) => p.data.data),
            pageParams: infiniteData.pageParams,
        }),
    });
};
