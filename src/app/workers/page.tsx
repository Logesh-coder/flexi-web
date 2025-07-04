'use client';

import { JobGrid } from '@/components/jobs/JobGrid';
import WorkersFilters from '@/components/workers/workerFilter';
import { useInfiniteWorkers } from '@/hooks/useInfiniteWorkers';
import { JobFilters as FiltersType } from '@/types/jobs';
import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WorkersPage() {
    const [filters, setFilters] = useState<FiltersType>({
        city: '',
        area: '',
        minBudget: '',
        maxBudget: '',
        search: '',
        date: '',
        id: ''
    });

    const [searchValue, setSearchValue] = useState('');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [clearFilterListPage, setClearFilterListPage] = useState(false);

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        refetch
    } = useInfiniteWorkers(filters);

    const updateFilter = (key: keyof FiltersType, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.length >= 3 || value.length === 0) {
            updateFilter('search', value);
        }
    };

    const isFilterApplied = Object.values(filters).some((v) => v !== '');

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

    const allWorkers = data?.pages.flatMap((page) => page.workers) ?? [];

    return (
        <div className="max-w-7xl mx-auto px-8 py-8">
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Find Workers</h1>

            {/* Mobile Filter Button */}
            <div className="md:hidden flex items-center justify-end  gap-5">
                {isFilterApplied && (
                    <button
                        className="flex items-center gap-2 px-2 py-2 border border-primary-400 hover:bg-primary-100 rounded-lg text-sm"
                        onClick={() => setClearFilterListPage(true)}
                    >
                        <X className="w-5 h-5" />
                        Clear filter
                    </button>
                )}
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

            {/* Layout */}
            <div className="flex relative gap-8 min-h-screen">
                <div className="w-[30%] max-md:hidden sticky top-0 pt-4 self-start h-fit">
                    <WorkersFilters
                        filters={filters}
                        updateFilter={updateFilter}
                        search={true}
                        setSearch={() => refetch()}
                        clearFilterListPage={clearFilterListPage}
                        setClearFilterListPage={setClearFilterListPage}
                        setMobileFilterOpen={setMobileFilterOpen}
                    />
                </div>
                <div className="md:w-[70%] w-full">
                    <JobGrid
                        jobs={allWorkers}
                        loading={isLoading}
                        searchValue={searchValue}
                        setSearchValue={handleSearchChange}
                        loadMore={fetchNextPage}
                        hasMore={!!hasNextPage}
                        type="worker"
                    />
                </div>
            </div>

            {/* Mobile Filter Sidebar */}
            {mobileFilterOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end md:hidden">
                    <div className="w-full sm:w-[400px] h-full max-sm:pt-[200px] bg-white dark:bg-gray-900 p-4 overflow-y-auto relative">
                        <button
                            onClick={() => setMobileFilterOpen(false)}
                            className="absolute top-4 mr-3 mt-3 right-4 text-gray-600 dark:text-gray-300"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <WorkersFilters
                            filters={filters}
                            updateFilter={updateFilter}
                            search={true}
                            setSearch={() => refetch()}
                            clearFilterListPage={clearFilterListPage}
                            setClearFilterListPage={setClearFilterListPage}
                            setMobileFilterOpen={setMobileFilterOpen}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
