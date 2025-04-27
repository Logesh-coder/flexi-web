'use client';

import { EmptyState } from '@/components/EmptyState';
import { JobCard } from '@/components/jobs/JobCard';
import { JobCardSkeleton } from '@/components/jobs/JobCardSkeleton';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { getWishlist, getWorkerWishlist } from '@/services/wishlist/whishlist';
import { Job } from '@/types/jobs';
import { Bookmark, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SavedItemsPage() {
  const [searchValue, setSearchValue] = useState('');
  const [savedItems, setSavedItems] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'job' | 'worker'>('job');

  useEffect(() => {
    setPage(1);
    setSavedItems([]);
  }, [searchValue, tab]);

  useEffect(() => {
    const fetchSavedItems = async () => {
      setLoading(true);
      try {
        const limit = parseInt(process.env.NEXT_PUBLIC_PAGELIMIT || '10', 10);
        let response;

        if (tab === 'job') {
          response = await getWishlist({ page, limit, search: searchValue });
        } else {
          response = await getWorkerWishlist({ page, limit, search: searchValue });
        }

        const newItems = response?.data?.data?.wishlistItems || [];

        if (page === 1) {
          setSavedItems(newItems);
        } else {
          setSavedItems((prev) => [...prev, ...newItems]);
        }

        setHasMore(newItems.length === limit);
      } catch (error) {
        console.error('Failed to fetch saved items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedItems();
  }, [page, searchValue, tab]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          className={`py-2 px-6 rounded-full text-sm font-semibold ${tab === 'job' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          onClick={() => setTab('job')}
        >
          Jobs
        </button>
        <button
          className={`py-2 px-6 rounded-full text-sm font-semibold ${tab === 'worker' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          onClick={() => setTab('worker')}
        >
          Workers
        </button>
      </div>

      <Input
        icon={Search}
        placeholder={tab === 'job' ? 'Search Job Title' : 'Search Worker Name'}
        value={searchValue}
        className="mb-8"
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {loading ? (
        <div className="grid gap-6">
          {[...Array(2)].map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : savedItems.length > 0 ? (
        <div className="grid gap-6">
          {savedItems.map((item: any) => (
            <JobCard key={item._id} job={item} type={tab} />
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
          title={tab === 'job' ? 'No saved jobs' : 'No saved workers'}
          description={tab === 'job' ? 'Jobs you save will appear here.' : 'Workers you save will appear here.'}
        />
      )}
    </div>
  );
}
