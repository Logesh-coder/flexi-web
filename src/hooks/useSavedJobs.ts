import { useState } from 'react'
import { Job } from '@/types/jobs'

const MOCK_SAVED_JOBS: Job[] = [
  {
    id: 1,
    title: 'Senior React Developer',
    description: 'Looking for an experienced React developer...',
    type: 'full-time',
    location: 'Remote',
    budget: '$5,000 - $7,000',
    timePosted: '2 days ago',
    skills: ['React', 'TypeScript', 'Next.js'],
    experience: 'expert'
  }
]

export function useSavedJobs() {
  const [savedJobs] = useState<Job[]>(MOCK_SAVED_JOBS)
  return { savedJobs }
}