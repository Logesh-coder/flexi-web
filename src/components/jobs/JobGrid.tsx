import { Job } from '@/types/jobs'
import { JobCard } from './JobCard'

interface JobGridProps {
  jobs: Job[]
}

export function JobGrid({ jobs }: JobGridProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No jobs found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}