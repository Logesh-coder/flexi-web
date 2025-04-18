import { Job } from '@/types/jobs'
import { PostedJobCard } from './PostedJobCard'

interface PostedJobListProps {
  jobs: Job[]
}

export function PostedJobList({ jobs }: PostedJobListProps) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <PostedJobCard key={job._id} job={job} />
      ))}
    </div>
  )
}