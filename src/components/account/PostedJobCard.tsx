import { Button } from '@/components/ui/Button'
import { Job } from '@/types/jobs'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

interface PostedJobCardProps {
  job: Job
}

export function PostedJobCard({ job }: PostedJobCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 capitalize">
            {job.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1 capitalize">
              <MapPin className="w-4 h-4 " />
              {job.area}, {job.city}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/jobs/${job.slug}`}>
            <Button variant="outline">View</Button>
          </Link>
          <Link href={`/jobs/edit/${job.slug}`}>
            <Button variant="outline">Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}