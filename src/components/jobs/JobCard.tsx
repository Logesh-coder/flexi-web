import { addWishlist, addWorkerWishlist, removeWishlist, removeWorkerWishlist } from '@/services/wishlist/whishlist';
import { Job } from '@/types/jobs';
import axios from 'axios';
import { CalendarDays, Clock, MapPin, Share2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ShareButtons from '../ui/ShareButtons';
import WishlistButton from '../ui/WhishlistButton';

interface JobCardProps {
  job: Job;
  type?: string;
}

export function JobCard({ job, type }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(job.isSaved || false);
  const path = usePathname();

  const isPostingPage = path === '/jobs/post';

  const toggleWishlist = async () => {
    try {
      if (isSaved) {
        if (type === 'worker') {
          await removeWorkerWishlist(job);
        } else {
          await removeWishlist(job);
        }
      } else {
        if (type === 'worker') {
          await addWorkerWishlist(job);
        } else {
          await addWishlist(job);
        }
      }
      setIsSaved(!isSaved);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const tokenError = error.response?.data?.message;
        if (tokenError === 'Authorization token is required') {
          toast.error('Please sign in to add items to your wishlist.');
        }
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  const userMobileNumber = job?.contact || job?.createUser?.mobile;


  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 group">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl capitalize font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              <Link
                href={`${type === 'worker' ? `/workers/${job.slug}` : `/jobs/${job.slug}`}`}
                className="hover:underline"
                onClick={(e) => isPostingPage && e.preventDefault()}
              >
                {type === 'worker' ? job.name : job.title}
              </Link>

            </h3>
            <div className="flex">
              <WishlistButton
                isSaved={isSaved}
                isPostingPage={isPostingPage}
                toggleWishlist={toggleWishlist}
              />

              {isPostingPage ? <Share2
                className="w-6 h-6 cursor-pointer ml-4 text-gray-400 hover:text-primary-400"
              /> : <ShareButtons url={`/jobs/${job.slug}`} />}

            </div>
          </div>

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
          <p className="capitalize text-sm mb-2 text-primary-400">{job.domain}</p>
        )}

        <div className="text-end">
          <Link
            href={` ${isPostingPage ? "" : `tel:${userMobileNumber}`}`}
            className="text-white p-2 px-6 text-sm rounded-full hover:bg-primary-400 bg-primary-500"
          >
            Call Now
          </Link>
        </div>
      </div>
    </div >
  );
}
