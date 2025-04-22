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
    id: ''
  })

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
        const limit = parseInt(process.env.NEXT_PUBLIC_PAGELIMIT || "10", 10);

        const response = await getJobService({ ...filters, page, limit: limit });

        const fetchedJobs = response.data?.data?.jobs || [];
        const totalPages = response.data?.data?.pages || 1;

        setJobs(prev => (page === 1 ? fetchedJobs : [...prev, ...fetchedJobs]));
        setHasMore(page < totalPages);

      } catch (err: any) {
        setError(err.message || 'Failed to fetch jobs')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [search, filters.search, page, filters.id])

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
    hasMore,
    loadMore: () => setPage(prev => prev + 1),
  }
}
