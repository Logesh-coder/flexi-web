'use client'

import { JobFilters } from '@/components/jobs/JobFilters';
import { JobGrid } from '@/components/jobs/JobGrid';
import { useJobFilters } from '@/hooks/useJobFilters';
import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function JobsPage() {
  const { filters, updateFilter, jobs, loading, search, setSearch, searchValue, setSearchValue, loadMore, hasMore, setLimit } = useJobFilters();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setLimit(parseInt(process.env.NEXT_PUBLIC_PAGELIMIT || '6', 10))
  }, [])

  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFilterOpen]);

  const isFilterApplied = Object.values(filters).some((value) => value !== '');


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Find Jobs</h1>

      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm 
          ${isFilterApplied
              ? 'bg-primary-500 text-white border-primary-500 hover:bg-primary-600'
              : 'text-gray-700 dark:text-white border-gray-300 dark:border-gray-600'}`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </button>

      </div>

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
            type='job'
          />
        </div>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end md:hidden">
          <div className="w-full sm:w-[400px] h-full bg-white dark:bg-gray-900 p-4 overflow-y-auto relative shadow-lg">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="absolute top-4 mr-3 mt-3 right-4 text-gray-600 dark:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
            <JobFilters
              filters={filters}
              updateFilter={updateFilter}
              search={search}
              setSearch={setSearch}
              setMobileFilterOpen={setMobileFilterOpen}
            />
          </div>
        </div>
      )}
    </div>
  )
}