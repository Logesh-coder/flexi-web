import { useState } from 'react'
import { Application } from '@/types/applications'

const MOCK_APPLICATIONS: Application[] = [
  {
    id: 1,
    jobId: 1,
    jobTitle: 'Senior React Developer',
    company: 'Tech Solutions Inc.',
    appliedDate: '2 days ago',
    status: 'pending'
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: 'Full Stack Developer',
    company: 'Digital Innovations',
    appliedDate: '1 week ago',
    status: 'interviewing'
  }
]

export function useApplications() {
  const [applications] = useState<Application[]>(MOCK_APPLICATIONS)
  return { applications }
}