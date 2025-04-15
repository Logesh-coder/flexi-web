import { useJobFilters } from '@/hooks/useJobFilters';
import { Job } from '@/types/jobs';
import { Search } from 'lucide-react';
import Input from '../ui/Input';
import { JobCard } from './JobCard';

interface JobGridProps {
  jobs: Job[]
}

export function JobGrid({ jobs }: JobGridProps) {
  const { filters, updateFilter } = useJobFilters();


  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No jobs found matching your criteria.</p>
      </div>
    )
  }

  return (
    <>
      <Input
        icon={Search}
        placeholder="Search jobs..."
        value={filters.search}
        className='mb-8'
        onChange={(e) => updateFilter('search', e.target.value)}
      />

      <div className="grid gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </>
  )
}