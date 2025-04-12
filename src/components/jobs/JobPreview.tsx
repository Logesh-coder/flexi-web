import { JobFormData } from '@/types/jobs'
import { CalendarDays, Clock, DollarSign, MapPin } from 'lucide-react'

interface JobPreviewProps {
  jobData: JobFormData
}

export function JobPreview({ jobData }: JobPreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Job Preview</h2>

      {/* Preview Card - Matches JobCard design exactly */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          {/* Header with Title */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {jobData.title || "Your job title will appear here"}
            </h3>

            {/* Meta Info Row */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
              {jobData.date && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 opacity-70" />
                  {jobData.date}
                </span>
              )}
              {jobData.budget && (
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 opacity-70" />
                  {jobData.budget}
                </span>
              )}
            </div>
          </div>

          {/* Location Info */}
          {(jobData.area || jobData.city || jobData.landMark) && (
            <div className="mb-4">
              <div className="flex items-start gap-1.5 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 opacity-70 flex-shrink-0" />
                <div>
                  {jobData.area && (
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {jobData.area}
                    </span>
                  )}
                  {jobData.city && (
                    <span className="text-gray-500 dark:text-gray-400">
                      {jobData.area ? `, ${jobData.city}` : jobData.city}
                    </span>
                  )}
                  {jobData.landMark && (
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      {jobData.landMark}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-5">
            {jobData.description ? (
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {jobData.description}
              </p>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 italic">
                Job description will appear here
              </p>
            )}
          </div>

          {/* Footer with Time */}
          <div className="mt-auto">
            <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              Just now (preview)
            </div>
          </div>
        </div>
      </div>

      {/* Help text */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
        This is how your job will appear to applicants
      </p>
    </div>
  )
}