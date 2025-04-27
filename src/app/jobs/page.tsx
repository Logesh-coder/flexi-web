'use client'

import { JobFilters } from '@/components/jobs/JobFilters';
import { JobGrid } from '@/components/jobs/JobGrid';
import { useJobFilters } from '@/hooks/useJobFilters';
import { useEffect } from 'react';

export default function JobsPage() {
  const { filters, updateFilter, jobs, loading, search, setSearch, searchValue, setSearchValue, loadMore, hasMore, setLimit } = useJobFilters();

  useEffect(() => {
    setLimit(parseInt(process.env.NEXT_PUBLIC_PAGELIMIT || '6', 10))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Find Jobs</h1>
      <div className="flex relative gap-8 min-h-screen">
        <div className="w-[30%] max-md:hidden sticky top-4 self-start h-fit">
          <JobFilters
            filters={filters}
            updateFilter={updateFilter}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <div className="md:w-[70%] w-full">
          <JobGrid
            updateFilter={updateFilter}
            jobs={jobs}
            loading={loading}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            loadMore={loadMore}
            hasMore={hasMore}
          />
        </div>
      </div>


    </div>
  )
}