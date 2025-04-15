import { Job } from '@/types/jobs'
import { JobCard } from './JobCard'

interface JobPreviewProps {
  jobData: Job
}

export function JobPreview({ jobData }: JobPreviewProps) {

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Job Preview</h2>

      <JobCard job={jobData} />


      {/* Help text */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
        This is how your job will appear to applicants
      </p>
    </div>
  )
}