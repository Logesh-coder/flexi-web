'use client'
import { JobGrid } from '@/components/jobs/JobGrid';
import { WorkersFilters } from '@/components/workers/workerFilter';
import { useWorkerFilters } from '@/hooks/useWorkerFilter';
import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function JobsPage() {
    const {
        filters,
        updateFilter,
        workers,
        loading,
        search,
        setSearch,
        searchValue,
        setSearchValue,
        loadMore,
        hasMore,
    } = useWorkerFilters();

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // Prevent body scroll when mobile filter is open
    useEffect(() => {
        if (mobileFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileFilterOpen]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Find Workers</h1>

            {/* Mobile Filter Toggle Button */}
            <div className="md:hidden flex justify-end mb-4">
                <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filter
                </button>
            </div>

            <div className="flex gap-8 min-h-screen">
                {/* Desktop Filter */}
                <div className="w-[30%] max-md:hidden sticky top-4 self-start h-fit">
                    <WorkersFilters
                        filters={filters}
                        updateFilter={updateFilter}
                        search={search}
                        setSearch={setSearch}
                    />
                </div>

                {/* Job Grid */}
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

            {/* Mobile Filter Slide-over */}
            {mobileFilterOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end md:hidden">
                    <div className="w-full sm:w-[400px] h-full bg-white dark:bg-gray-900 p-4 overflow-y-auto relative shadow-lg">
                        <button
                            onClick={() => setMobileFilterOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <WorkersFilters
                            filters={filters}
                            updateFilter={updateFilter}
                            search={search}
                            setSearch={setSearch}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
