'use client'

import { useSavedJobs } from '@/hooks/useSavedJobs'
import { JobGrid } from '@/components/jobs/JobGrid'
import { EmptyState } from '@/components/EmptyState'
import { Bookmark } from 'lucide-react'

export default function SavedJobsPage() {
  const { savedJobs } = useSavedJobs()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Saved Jobs</h1>
      {savedJobs.length > 0 ? (
        <JobGrid jobs={savedJobs} />
      ) : (
        <EmptyState
          icon={Bookmark}
          title="No saved jobs"
          description="Jobs you save will appear here"
        />
      )}
    </div>
  )
}