import { Job } from '@/types/jobs'
import { Briefcase, CalendarDays, Clock, DollarSign, MapPin } from 'lucide-react'
import Link from 'next/link'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 group">
      <div className="flex flex-col h-full">
        {/* Header with Title */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            <Link href={`/jobs/${job.id}`} className="hover:underline">
              {job.title}
            </Link>
          </h3>

          {/* Meta Info Row */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 opacity-70" />
              {job.type}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 opacity-70" />
              {job.budget}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 opacity-70" />
              {job.date}
            </span>
          </div>
        </div>

        {/* Location Info */}
        <div className="mb-4">
          <div className="flex items-start gap-1.5 text-sm">
            <MapPin className="w-4 h-4 mt-0.5 opacity-70 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">{job.location}</span>
              {job.city && (
                <span className="text-gray-500 dark:text-gray-400">, {job.city}</span>
              )}
              {job.landMark && (
                <p className="text-gray-500 dark:text-gray-400 mt-1">{job.landMark}</p>
              )}
            </div>
          </div>
        </div>

        {/* Description (truncated) */}
        {job.description && (
          <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">
            {job.description}
          </p>
        )}

        {/* Footer with Skills and Time */}
        <div className="mt-auto">
          {/* Skills Tags */}
          {job.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Posted Time */}
          <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {job.timePosted}
            </span>
            <Link
              href={`/jobs/${job.id}`}
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}