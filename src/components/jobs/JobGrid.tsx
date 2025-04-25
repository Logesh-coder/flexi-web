import { JobFilters } from '@/types/jobs';
import { Search } from 'lucide-react';
import { Button } from '../ui/Button';
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

export function JobGrid({ type, searchValue, setSearchValue, jobs, loading, hasMore, loadMore }: JobGridProps) {

  const jobsArray = jobs as any ?? [];

  return (
    <>
      <Input
        icon={Search}
        placeholder={`Search ${type ? `${type} name` : 'jobs title'}...`}
        value={searchValue}
        className='mb-8'
        onChange={setSearchValue}
      />

      {loading ? (
        <div className="grid gap-6">
          {[...Array(2)].map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          <>
            {jobsArray && jobsArray.length > 0 ? (
              <div className="grid gap-6">
                {jobsArray.map((job: any) => (
                  <JobCard key={job._id} job={job} type={type} />
                ))}
                {hasMore && !loading && (
                  <div className="text-center mt-8">
                    <Button
                      onClick={loadMore}
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No {`${type ? `${type}` : 'jobs'}`} found</p>
              </div>
            )}

          </>
        </div>
      )}

    </>
  )
}