'use client';

import { EmptyState } from '@/components/EmptyState';
import { JobCard } from '@/components/jobs/JobCard';
import { JobCardSkeleton } from '@/components/jobs/JobCardSkeleton';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { getWishlist } from '@/services/wishlist/whishlist';
import { Job } from '@/types/jobs';
import { Bookmark, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SavedJobsPage() {
  const [searchValue, setSearchValue] = useState('');
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const type = 'job';

  useEffect(() => {
    setPage(1);
    setSavedJobs([]);
  }, [searchValue]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      setLoading(true);
      try {
        const limit = parseInt(process.env.NEXT_PUBLIC_PAGELIMIT || '10', 10);
        const response = await getWishlist({ page, limit, search: searchValue });
        const newJobs = response?.data?.data?.wishlistItems || [];

        if (page === 1) {
          setSavedJobs(newJobs);
        } else {
          setSavedJobs((prev) => [...prev, ...newJobs]);
        }

        setHasMore(newJobs.length === limit);
      } catch (error) {
        console.error('Failed to fetch saved jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [page, searchValue]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Saved Jobs</h1>

      <Input
        icon={Search}
        placeholder="Search Job Title"
        value={searchValue}
        className="mb-8"
        onChange={(e) => setSearchValue(e.target.value)} // ✅ fixed
      />

      {loading ? (
        <div className="grid gap-6">
          {[...Array(2)].map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : savedJobs.length > 0 ? (
        <div className="grid gap-6">
          {savedJobs.map((job: any) => (
            <JobCard key={job._id} job={job} type={type} />
          ))}
          {hasMore && (
            <div className="text-center mt-8">
              <Button onClick={loadMore}>Load More</Button>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="No saved jobs"
          description="Jobs you save will appear here"
        />
      )}
    </div>
  );
}
