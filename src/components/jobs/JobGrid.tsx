import { JobFilters } from '@/types/jobs';
import { Loader2, Search } from 'lucide-react';
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
  type: string;
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
      <div className="sticky top-0 z-10">
        <div className="py-4 bg-white dark:bg-black">
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

                {/* Sentinel div for triggering loadMore */}
                {hasMore && <div ref={observerRef} className="h-10" />}

                {/* Bottom loader */}
                {hasMore && loading && (
                  <div className="flex justify-center items-center py-6">
                    <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No {type ?? 'jobs'} found
                </p>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
