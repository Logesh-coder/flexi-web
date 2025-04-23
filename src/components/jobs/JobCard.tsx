import { addWishlist, removeWishlist } from '@/services/wishlist/whishlist';
import { Job } from '@/types/jobs';
import { CalendarDays, Clock, MapPin, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface JobCardProps {
  job: Job;
  type?: string;
}

export function JobCard({ job, type }: JobCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(job.isSaved || false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSave = async () => {
    try {
      if (isSaved) {
        await removeWishlist(job);
      } else {
        await addWishlist(job);
      }
      setIsSaved(!isSaved);
      setMenuOpen(false);
    } catch (error) {
      console.error("Wishlist action failed:", error);
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 group">
      {/* Top-right menu */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10"
          >
            <button
              onClick={toggleSave}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {isSaved ? 'Unsave Job' : 'Save Job'}
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl capitalize font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            <Link href={`${type === 'worker' ? `/workers/${job.slug}` : `/jobs/${job.slug}`}`} className="hover:underline">
              {type === 'worker' ? job.name : job.title}
            </Link>
          </h3>

          {/* Meta Info */}
          {type !== 'worker' && (
            <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 opacity-70" />
                {job.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {job.durationStartTime} to {job.durationEndTime}
              </span>
            </div>
          )}

          {type === 'worker' && (
            <div className="my-2">
              <div className="flex items-start gap-1.5 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 opacity-70 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-700 capitalize dark:text-gray-300">{job.area}</span>
                  {job.city && (
                    <span className="text-gray-500 capitalize dark:text-gray-400">, {job.city}</span>
                  )}
                  {job.landMark && (
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{job.landMark}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Budget */}
        <h3 className="text-xl capitalize font-semibold mb-2 text-gray-900 dark:text-white">
          <Link href={`/jobs/${job._id}`}>
            ₹ {type === 'worker' ? job.salary : job.budget}
          </Link>
        </h3>

        {/* Location */}
        {type !== 'worker' && (
          <div className="my-2">
            <div className="flex items-start gap-1.5 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 opacity-70 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-700 capitalize dark:text-gray-300">{job.area}</span>
                {job.city && (
                  <span className="text-gray-500 capitalize dark:text-gray-400">, {job.city}</span>
                )}
                {job.landMark && (
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{job.landMark}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {type === 'worker' && (
          <p className="capitalize text-sm text-primary-400">{job.domain}</p>
        )}

        <div className="mt-auto">
          <div className="text-right text-xs text-gray-400 dark:text-gray-500">
            <Link
              href={`${pathname === '/jobs/post' ? '' : `${type === 'worker' ? `/workers/${job.slug}` : `/jobs/${job.slug}`}`}`}
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
