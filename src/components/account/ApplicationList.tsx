import { Application } from '@/types/applications'
import { ApplicationCard } from './ApplicationCard'

interface ApplicationListProps {
  applications: Application[]
}

export function ApplicationList({ applications }: ApplicationListProps) {
  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  )
}