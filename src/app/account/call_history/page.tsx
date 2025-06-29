'use client';
import { EmptyState } from '@/components/EmptyState';
import { JobCard } from '@/components/jobs/JobCard';
import { JobCardSkeleton } from '@/components/jobs/JobCardSkeleton';
import { useCallHistory } from '@/hooks/useCallHistory';
import { PhoneCall } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function CallHistoryPage() {
    const [tab, setTab] = useState<'job' | 'worker'>('job');
    const { ref, inView } = useInView();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useCallHistory(tab);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage]);

    return (
        <div className="max-sm:m-4">
            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
                {(['job', 'worker'] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`py-2 px-6 rounded-full text-sm font-semibold ${tab === t
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        {t === 'job' ? 'Jobs' : 'Workers'}
                    </button>
                ))}
            </div>

            {/* Content */}
            {isPending ? (
                <div className="grid gap-6">
                    {[...Array(2)].map((_, i) => (
                        <JobCardSkeleton key={i} />
                    ))}
                </div>
            ) : (data?.pages?.length ?? 0) > 0 ? (
                <div className="grid gap-6">
                    {data?.pages?.map((item: any) => (
                        <JobCard
                            key={item._id}
                            job={item.job ?? item.worker}
                            type={tab}
                        />
                    ))}
                    <div ref={ref} className="text-center py-4">
                        {isFetchingNextPage
                            ? 'Loading more…'
                            : hasNextPage
                                ? 'Scroll to load more'
                                : '— End —'}
                    </div>
                </div>
            ) : (
                <EmptyState
                    icon={PhoneCall}
                    title={tab === 'job' ? 'No job calls yet' : 'No worker calls yet'}
                    description={
                        tab === 'job'
                            ? 'Your job call history will appear here.'
                            : 'Your worker call history will appear here.'
                    }
                />
            )}
        </div>
    );
}
