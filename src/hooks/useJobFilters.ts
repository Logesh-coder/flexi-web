import getJobService from '@/services/get-jobs'
import { Job, JobFilters } from '@/types/jobs'
import { useEffect, useRef, useState } from 'react'

export function useJobFilters() {
  const [filters, setFilters] = useState({
    city: '',
    area: '',
    date: '',
    minBudget: '',
    maxBudget: '',
    search: '',
  })

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const updateFilter = (key: keyof JobFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (value.length >= 3 || value.length === 0) {
        updateFilter('search', value)
      }
    }, 300)
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await getJobService(filters)
        setJobs(response.data?.data)

      } catch (err: any) {
        setError(err.message || 'Failed to fetch jobs')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [search, filters.search])

  return {
    filters,
    jobs: jobs,
    loading,
    error,
    updateFilter,
    setSearch,
    search,
    searchValue,
    setSearchValue: handleSearchChange,
  }
}
