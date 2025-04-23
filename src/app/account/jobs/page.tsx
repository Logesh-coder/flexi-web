'use client'

import { PostedJobList } from '@/components/account/PostedJobList'
import { EmptyState } from '@/components/EmptyState'
import { Button } from '@/components/ui/Button'
import getJobService from '@/services/get-jobs'
import { Job } from '@/types/jobs'
import { Briefcase } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function PostedJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const limit = parseInt(process.env.NEXT_PUBLIC_PAGELIMIT || "10", 10);

        const response = await getJobService({ id: 'true', page, limit: limit });

        const fetchedJobs = response.data?.data?.jobs || [];
        const totalPages = response.data?.data?.pages || 1;

        setJobs(prev => (page === 1 ? fetchedJobs : [...prev, ...fetchedJobs]));
        setHasMore(page < totalPages);

      } catch (err: any) {
        setError(err.message || 'Failed to fetch jobs')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [page])

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Posted Jobs</h1>
        <Link href="/jobs/post">
          <Button>Post New Job</Button>
        </Link>
      </div>


      {loading && page === 1 ? (
        <>Loading</>
      ) : (
        <>
          {jobs.length > 0 ? (
            <>
              <PostedJobList jobs={jobs} />
              {hasMore && (
                <div className="flex justify-center mt-6">
                  <Button onClick={handleLoadMore} disabled={loading}>
                    {loading ? 'Loading...' : 'Load More'}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={Briefcase}
              title="No posted jobs"
              description="Jobs you post will appear here"
              action={
                <Link href="/jobs/post">
                  <Button>Post Your First Job</Button>
                </Link>
              }
            />
          )}
        </>
      )}
    </div>
  )
}