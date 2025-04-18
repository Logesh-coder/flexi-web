import { Job } from '@/types/jobs'
import { CalendarDays, Clock, MapPin, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const pathname = usePathname();

  const toggleSave = () => {
    setIsSaved(!isSaved)
    setMenuOpen(false)
  }

  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 group">
      {/* Top-right menu */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
            <button
              onClick={toggleSave}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {isSaved ? 'Unsave Job' : 'Save Job'}
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl capitalize font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            <Link href={`/jobs/${job.slug}`} className="hover:underline">
              {job.title}
            </Link>
          </h3>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 opacity-70" />
              {job.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {job.durationStartTime} to {job.durationEndTime}
            </span>
          </div>
        </div>

        {/* Budget */}
        <h3 className="text-xl capitalize font-semibold mb-2 text-gray-900 dark:text-white">
          <Link href={`/jobs/${job._id}`}>
            ₹ {job.budget}
          </Link>
        </h3>

        {/* Location */}
        <div className="my-4">
          <div className="flex items-start gap-1.5 text-sm">
            <MapPin className="w-4 h-4 mt-0.5 opacity-70 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-700 capitalize dark:text-gray-300">{job.area}</span>
              {job.city && (
                <span className="text-gray-500 capitalize dark:text-gray-400">, {job.city}</span>
              )}
              {job.landMark && (
                <p className="text-gray-500 dark:text-gray-400 mt-1">{job.landMark}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="text-right text-xs text-gray-400 dark:text-gray-500">
            <Link
              href={` ${pathname === '/jobs/post' ? "" : `/jobs/${job.slug}`}`}
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
