// hooks/useCallHistory.ts
import { getJobCall, getWorkersCall } from '@/services/add-call';
import { useQuery } from '@tanstack/react-query';

export const useCallHistory = (tab: 'job' | 'worker') => {
    return useQuery({
        queryKey: ['call-history', tab],
        queryFn: () => (tab === 'job' ? getJobCall() : getWorkersCall()),
        select: (res) => res.data?.data || [],
    });
};
