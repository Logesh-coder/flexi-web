'use client'

import { JobGrid } from '@/components/jobs/JobGrid';
import { WorkersFilters } from '@/components/workers/workerFilter';
import { useJobFilters } from '@/hooks/useJobFilters';

export default function JobsPage() {
    const { filters, updateFilter, jobs, loading, search, setSearch, searchValue, setSearchValue, loadMore, hasMore } = useJobFilters();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Find Wokers</h1>
            <div className="flex  gap-8">
                <div className="w-[30%] max-md:hidden ">
                    <WorkersFilters filters={filters} updateFilter={updateFilter} search={search} setSearch={setSearch} />
                </div>
                <div className=" md:w-[70%] w-full">
                    <JobGrid type='worker' updateFilter={updateFilter} jobs={jobs} loading={loading} searchValue={searchValue} setSearchValue={setSearchValue} loadMore={loadMore} hasMore={hasMore} />
                </div>
            </div>
        </div>
    )
}