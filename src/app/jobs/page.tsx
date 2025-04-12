'use client'

import { JobFilters } from '@/components/jobs/JobFilters'
import { JobGrid } from '@/components/jobs/JobGrid'
import { useJobFilters } from '@/hooks/useJobFilters'

export default function JobsPage() {
  const { filters, jobs, updateFilter } = useJobFilters()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Find Jobs</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <JobFilters filters={filters} updateFilter={updateFilter} />
        <div className="lg:col-span-3">
          <JobGrid jobs={jobs} />
        </div>
      </div>
    </div>
  )
}