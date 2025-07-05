// hooks/useWorkerFilters.ts
import getWorkersService, { Worker, WorkerFiltersProps } from '@/services/workers';
import { useEffect, useRef, useState } from 'react';

export function useWorkerFilters() {
    const [filters, setFilters] = useState<WorkerFiltersProps>({
        city: '',
        area: '',
        minBudget: '',
        maxBudget: '',
        search: '',
    });

    const [workers, setWorkers] = useState<Worker[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updateFilter = (key: keyof WorkerFiltersProps, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (value.length >= 3 || value.length === 0) {
                updateFilter('search', value);
            }
        }, 300);
    };

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                setLoading(true);

                const limit = parseInt(process.env.NEXT_PUBLIC_PAGELIMIT || '10', 10);
                const response = await getWorkersService({ ...filters, page, limit });

                const fetchedWorkers = response.workers || [];
                const totalPages = response.pages || 1;

                setWorkers((prev) =>
                    page === 1 ? fetchedWorkers : [...prev, ...fetchedWorkers]
                );
                setHasMore(page < totalPages);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch workers');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkers();
    }, [search, filters.search, page]);

    return {
        filters,
        workers,
        loading,
        error,
        updateFilter,
        setSearch,
        search,
        searchValue,
        setSearchValue: handleSearchChange,
        hasMore,
        loadMore: () => setPage((prev) => prev + 1),
    };
}
