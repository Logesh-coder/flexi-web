import { Job } from '@/types/jobs'
import { Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface PostedJobCardProps {
  job: Job
}

export function PostedJobCard({ job }: PostedJobCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {job.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              12 Applicants
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {job.timePosted}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/jobs/${job.id}/applications`}>
            <Button variant="outline">View Applications</Button>
          </Link>
          <Button variant="outline">Edit</Button>
        </div>
      </div>
    </div>
  )
}