'use client'

import { useApplications } from '@/hooks/useApplications'
import { ApplicationList } from '@/components/account/ApplicationList'
import { EmptyState } from '@/components/EmptyState'
import { FileText } from 'lucide-react'

export default function ApplicationsPage() {
  const { applications } = useApplications()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">My Applications</h1>
      {applications.length > 0 ? (
        <ApplicationList applications={applications} />
      ) : (
        <EmptyState
          icon={FileText}
          title="No applications yet"
          description="Jobs you apply to will appear here"
        />
      )}
    </div>
  )
}