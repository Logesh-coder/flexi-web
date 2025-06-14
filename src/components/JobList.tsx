'use client';

import { useJobFilters } from '@/hooks/useJobFilters';
import Link from 'next/link';
import { useEffect } from 'react';
import { JobCard } from './jobs/JobCard';
import { JobCardSkeleton } from './jobs/JobCardSkeleton';

export function JobList() {
  const { jobs, loading, setLimit } = useJobFilters();

  useEffect(() => {
    setLimit(3)
  }, [])

  return (
    <section className="pb-16 pt-10 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Latest Jobs
          </h2>
          <Link href='/jobs' className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">
            View all
          </Link>
        </div>
        <div className="grid gap-6">
          {loading ? (
            <div className="grid gap-6">
              {[...Array(2)].map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6">
              <>
                {jobs && jobs.length > 0 ? (
                  <div className="grid gap-6">
                    {jobs.map((job: any) => (
                      <JobCard key={job._id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">No jobs found</p>
                  </div>
                )}

              </>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
