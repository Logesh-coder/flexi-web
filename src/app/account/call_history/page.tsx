'use client';

import { EmptyState } from '@/components/EmptyState';
import { JobCard } from '@/components/jobs/JobCard';
import { JobCardSkeleton } from '@/components/jobs/JobCardSkeleton';
import { useCallHistory } from '@/hooks/useCallHistory';
import { PhoneCall } from 'lucide-react';
import { useState } from 'react';

export default function CallHistoryPage() {
    const [tab, setTab] = useState<'job' | 'worker'>('job');

    const { data = [], isPending, isError } = useCallHistory(tab);

    return (
        <div className="max-sm:m-4">
            {/* Tab Buttons */}
            <div className="flex space-x-4 mb-8">
                <button
                    className={`py-2 px-6 rounded-full text-sm font-semibold ${tab === 'job' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setTab('job')}
                >
                    Jobs
                </button>
                <button
                    className={`py-2 px-6 rounded-full text-sm font-semibold ${tab === 'worker' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setTab('worker')}
                >
                    Workers
                </button>
            </div>

            {/* Content */}
            {isPending ? (
                <div className="grid gap-6">
                    {[...Array(2)].map((_, i) => (
                        <JobCardSkeleton key={i} />
                    ))}
                </div>
            ) : data.length > 0 ? (
                <div className="grid gap-6">
                    {data.map((item: any) => (
                        <JobCard key={item._id} job={item} type={tab} />
                    ))}
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
