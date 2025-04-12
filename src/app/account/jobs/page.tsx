'use client'

import { usePostedJobs } from '@/hooks/usePostedJobs'
import { PostedJobList } from '@/components/account/PostedJobList'
import { EmptyState } from '@/components/EmptyState'
import { Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function PostedJobsPage() {
  const { postedJobs } = usePostedJobs()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Posted Jobs</h1>
        <Link href="/jobs/post">
          <Button>Post New Job</Button>
        </Link>
      </div>
      
      {postedJobs.length > 0 ? (
        <PostedJobList jobs={postedJobs} />
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
    </div>
  )
}