'use client';

import { Button } from '@/components/ui/Button';
import ShareButtons from '@/components/ui/ShareButtons';
import WishlistButton from '@/components/ui/WhishlistButton';
import { addCall } from '@/services/add-call';
import getSingleJobService from '@/services/get-single-job-service';
import { addWishlist, removeWishlist } from '@/services/wishlist/whishlist';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Clock, Loader2, MapPin, User } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function JobDetailPage() {
  const { slug } = useParams();
  const jobUrl = usePathname();

  const [isSaved, setIsSaved] = useState(false);
  const [showCallWarning, setShowCallWarning] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['job', slug],
    queryFn: () => getSingleJobService(slug as string).then((res) => res?.data?.data),
    enabled: !!slug,
  });

  const userMobileNumber = data?.createUserId?.mobile


  useEffect(() => {
    if (typeof data?.isSaved === 'boolean') {
      setIsSaved(data?.isSaved);
    }
  }, [data?.isSaved]);

  const callMutation = useMutation({
    mutationFn: () => addCall({ job: data?._id }),
    onSuccess: () => {
      if (userMobileNumber) {
        window.location.href = `tel:${userMobileNumber}`;
      }
    },

    onError: (err) => {
      console.error('Call failed', err);
    },
  });

  const toggleWishlist = async () => {
    try {
      if (isSaved) {
        await removeWishlist(data);
      } else {
        await addWishlist(data);
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Wishlist action failed:", error);
    }
  };


  const handleCall = () => {
    const token = localStorage.getItem('TOKEN');
    const number = data?.createUserId?.mobile;

    if (!number) return;

    // window.location.href = `tel:${number}`;

    if (token) {
      callMutation.mutate();
    } else {
      setShowCallWarning(true);
    }
  };


  if (isError) {
    return <p className="text-red-500">{(error as any)?.message || 'Something went wrong'}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {isLoading ? (
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                ) : (
                  <span className='capitalize'>{data?.title}</span>
                )}
              </h1>

              <div className="flex">
                <WishlistButton isSaved={isSaved} toggleWishlist={toggleWishlist} />
                <ShareButtons url={jobUrl} title="Apply for this amazing job!" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-5 h-5" />
                {isLoading ? (
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  data?.date
                )}
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                {isLoading ? (
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  `${data?.durationStartTime} to ${data?.durationEndTime}`
                )}
              </div>
            </div>

            <h1 className="text-2xl text-primary-500 capitalize font-semibold mb-2">
              {isLoading ? (
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ) : (
                `₹ ${data?.budget}`
              )}
            </h1>

            <div className="flex items-center gap-1 mt-4">
              <MapPin className="w-5 h-5" />
              {isLoading ? (
                <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ) : (
                `${data?.area}, ${data?.city}`
              )}
            </div>

            <h4 className="text-[15px] ml-6 mt-2">
              {isLoading ? (
                <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ) : (
                data?.landMark
              )}
            </h4>

            {isLoading ? (
              <div className="mt-4 space-y-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 w-1/2 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-5/6 rounded animate-pulse"></div>
              </div>
            ) : (
              data?.description && (
                <div className="prose mt-4 dark:prose-invert max-w-none">
                  <h2 className="text-xl font-semibold mb-1">Description</h2>
                  <p className="whitespace-pre-line">{data?.description}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              About the Owner
            </h2>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-medium capitalize text-gray-900 dark:text-white">
                  {isLoading ? (
                    <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  ) : (
                    data?.createUserId?.name
                  )}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium">{data?.createUserId?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
          ) : (
            <>
              {callMutation.isPending ? (
                <Button className="w-full">
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                </Button>
              ) : (
                <Button onClick={handleCall} className="w-full">
                  Call Now
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showCallWarning && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-sm shadow-xl dark:border"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Not Logged In
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                You are not currently logged in. This call will not be saved in your call history.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCallWarning(false)}
                  className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowCallWarning(false);
                    setTimeout(() => {
                      const number = userMobileNumber;
                      if (number) window.location.href = `tel:${number}`;
                    }, 100);
                  }}
                  className="px-4 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700"
                >
                  Call Anyway
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
