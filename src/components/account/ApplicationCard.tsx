import { Application } from '@/types/applications'
import { Clock, Building } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

interface ApplicationCardProps {
  application: Application
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {application.jobTitle}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              {application.company}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {application.appliedDate}
            </div>
          </div>
        </div>
        <Badge variant={application.status}>{application.status}</Badge>
      </div>
    </div>
  )
}