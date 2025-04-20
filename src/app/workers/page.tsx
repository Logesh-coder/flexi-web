'use client'

import { JobGrid } from '@/components/jobs/JobGrid';
import { WorkersFilters } from '@/components/workers/workerFilter';
import { useWorkerFilters } from '@/hooks/useWorkerFilter';

export default function JobsPage() {
    const { filters, updateFilter, workers, loading, search, setSearch, searchValue, setSearchValue, loadMore, hasMore } = useWorkerFilters();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Find Wokers</h1>
            <div className="flex gap-8 min-h-screen">
                <div className="w-[30%] max-md:hidden sticky top-4 self-start h-fit">
                    <WorkersFilters
                        filters={filters}
                        updateFilter={updateFilter}
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
                <div className="md:w-[70%] w-full">
                    <JobGrid
                        type="worker"
                        updateFilter={updateFilter}
                        jobs={workers}
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