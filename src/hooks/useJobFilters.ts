import { useState, useEffect } from 'react'
import { Job, JobFilters } from '@/types/jobs'

const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'Senior React Developer',
    description: 'Looking for an experienced React developer...',
    type: 'full-time',
    location: 'Remote',
    budget: '$5,000 - $7,000',
    timePosted: '2 hours ago',
    skills: ['React', 'TypeScript', 'Next.js'],
    experience: 'expert'
  },
  // Add more mock jobs here
]

export function useJobFilters() {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    type: '',
    experience: '',
    location: '',
    minBudget: '',
    maxBudget: ''
  })

  const [filteredJobs, setFilteredJobs] = useState<Job[]>(MOCK_JOBS)

  const updateFilter = (key: keyof JobFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    let result = MOCK_JOBS

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        job =>
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower)
      )
    }

    if (filters.type) {
      result = result.filter(job => job.type === filters.type)
    }

    if (filters.experience) {
      result = result.filter(job => job.experience === filters.experience)
    }

    if (filters.location) {
      const locationLower = filters.location.toLowerCase()
      result = result.filter(job =>
        job.location.toLowerCase().includes(locationLower)
      )
    }

    setFilteredJobs(result)
  }, [filters])

  return {
    filters,
    jobs: filteredJobs,
    updateFilter
  }
}