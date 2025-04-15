import { Job, JobFilters } from '@/types/jobs'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function useJobFilters() {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    city: '',
    area: '',
    minBudget: '',
    maxBudget: '',
  })

  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const updateFilter = (key: keyof JobFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Fetch jobs from API once
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await axios.get<Job[]>('/api/jobs') // 👈 replace with your actual API endpoint
        setJobs(response.data)
        setFilteredJobs(response.data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch jobs')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Apply filters when they change
  useEffect(() => {
    let result = [...jobs]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        job =>
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower)
      )
    }

    if (filters.city) {
      const cityLower = filters.city.toLowerCase()
      result = result.filter(job =>
        job.city?.toLowerCase().includes(cityLower)
      )
    }

    if (filters.area) {
      const areaLower = filters.area.toLowerCase()
      result = result.filter(job =>
        job.area?.toLowerCase().includes(areaLower)
      )
    }

    const min = parseFloat(filters.minBudget)
    const max = parseFloat(filters.maxBudget)

    if (!isNaN(min)) {
      result = result.filter(job => parseFloat(job.budget.replace(/[^\d.-]/g, '')) >= min)
    }

    if (!isNaN(max)) {
      result = result.filter(job => parseFloat(job.budget.replace(/[^\d.-]/g, '')) <= max)
    }

    setFilteredJobs(result)
  }, [filters, jobs])

  return {
    filters,
    jobs: filteredJobs,
    loading,
    error,
    updateFilter,
  }
}
