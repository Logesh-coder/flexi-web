import { useState } from 'react'
import { Job } from '@/types/jobs'

const MOCK_POSTED_JOBS: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer Needed',
    description: 'Looking for a skilled frontend developer...',
    type: 'contract',
    location: 'Remote',
    budget: '$3,000 - $5,000',
    timePosted: '3 days ago',
    skills: ['React', 'Vue', 'CSS'],
    experience: 'intermediate'
  }
]

export function usePostedJobs() {
  const [postedJobs] = useState<Job[]>(MOCK_POSTED_JOBS)
  return { postedJobs }
}