'use client';

import getJobService from '@/services/get-jobs';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { JobCard } from './jobs/JobCard';
import { JobCardSkeleton } from './jobs/JobCardSkeleton';

export function JobList() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['latest-jobs', { limit: 3 }],
    queryFn: () => getJobService({ limit: 3 }),
    staleTime: 1000 * 60 * 5, // Optional: cache for 5 mins
  });

  const jobs = data?.jobs ?? [];

  return (
    <section className="pb-16 pt-10 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Latest Jobs
          </h2>
          <Link
            href="/jobs"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-6">
          {isLoading ? (
            [...Array(2)].map((_, i) => <JobCardSkeleton key={i} />)
          ) : isError ? (
            <div className="text-center py-12 text-red-500">Failed to load jobs.</div>
          ) : jobs.length > 0 ? (
            jobs.map((job: any) => <JobCard key={job._id} job={job} />)
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No jobs found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
