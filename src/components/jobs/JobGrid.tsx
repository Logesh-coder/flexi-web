import { JobFilters } from '@/types/jobs';
import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Input from '../ui/Input';
import { JobCard } from './JobCard';
import { JobCardSkeleton } from './JobCardSkeleton';

interface JobGridProps {
  updateFilter?: (key: keyof JobFilters, value: string) => void;
  jobs: any;
  loading: boolean;
  searchValue: string;
  setSearchValue: any;
  hasMore: boolean;
  type?: string;
  loadMore: () => void;
}

export function JobGrid({
  type,
  searchValue,
  setSearchValue,
  jobs,
  loading,
  hasMore,
  loadMore,
}: JobGridProps) {
  const jobsArray = jobs ?? [];
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 1.0,
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, loadMore]);

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 my-4">
        <div>
          <Input
            icon={Search}
            placeholder={`Search ${type === 'worker' ? `${type} domains` : 'jobs title'}...`}
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 mt-4">
        {loading && !jobsArray.length ? (
          <div className="grid gap-6">
            {[...Array(2)].map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6">
            {jobsArray.length > 0 ? (
              <>
                {jobsArray.map((job: any) => (
                  <JobCard key={job._id} job={job} type={type} />
                ))}
                {/* Sentinel div for intersection observer */}
                {hasMore && <div ref={observerRef} className="h-10" />}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No {type ?? 'jobs'} found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
