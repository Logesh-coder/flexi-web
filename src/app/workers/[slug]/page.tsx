'use client';

import { Button } from '@/components/ui/Button';
import { addCall } from '@/services/add-call';
import getSingleWorkerService from '@/services/get-single-worker';
import { addWorkerWishlist, removeWorkerWishlist } from '@/services/wishlist/whishlist';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Loader2, Mail, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WorkerDetailPage() {
  const { slug } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showCallWarning, setShowCallWarning] = useState(false);

  // Fetch worker
  const { data, isLoading } = useQuery({
    queryKey: ['worker', slug],
    queryFn: () => getSingleWorkerService(slug as string).then(res => res.data.data),
    enabled: !!slug,
  });

  useEffect(() => {
    if (data?.isSaved) {
      setIsWishlisted(true);
    }
  }, [data]);

  // Call mutation
  const callMutation = useMutation({
    mutationFn: () => addCall({ worker: data?._id }),
    onSuccess: () => {
      window.location.href = `tel:${data?.mobile}`;
    },
    onError: () => {
      console.error('Failed to track call');
    },
  });

  console.log('data', data)

  // const handleCall = () => {
  //   const token = localStorage.getItem('TOKEN');
  //   if (token) {
  //     callMutation.mutate();
  //   } else {
  //     setShowCallWarning(true);
  //   }
  // };

  const handleCall = () => {
    if (!data?.mobile) return;

    const token = localStorage.getItem('TOKEN');
    const number = data.mobile;

    // Open dialer immediately
    // window.location.href = `tel:${number}`;

    // Track call if logged in
    if (token) {
      callMutation.mutate();
    } else {
      setShowCallWarning(true);
    }
  };



  const toggleWishlist = async () => {
    try {
      if (isWishlisted) {
        await removeWorkerWishlist(data);
      } else {
        await addWorkerWishlist(data);
      }
      setIsWishlisted(prev => !prev);
    } catch (error) {
      console.error("Wishlist action failed:", error);
    }
  };

  const getAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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
                  <span className="capitalize">{data.name}</span>
                )}
              </h1>

              <span
                onClick={toggleWishlist}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-110 ${isWishlisted ? 'text-red-500' : 'text-gray-400'
                  }`}
              >
                <Heart
                  className={`w-6 h-6 ${isWishlisted ? 'fill-red-500' : 'fill-transparent'} transition-all`}
                />
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <Mail className="w-5 h-5" />
                {isLoading ? (
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  <Link href={`mailto:${data.email}`} className="text-[15px]">
                    {data.email}
                  </Link>
                )}
              </div>
            </div>

            <h1 className="text-2xl text-primary-500 capitalize font-semibold mb-2">
              {isLoading ? (
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ) : (
                `₹ ${data.salary}`
              )}
            </h1>

            <div className="flex items-center gap-1 mt-4">
              <MapPin className="w-5 h-5" />
              {isLoading ? (
                <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ) : (
                <span className="capitalize text-sm">{`${data.area}, ${data.city}`}</span>
              )}
            </div>

            {isLoading ? (
              <div className="mt-4 space-y-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 w-1/2 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-5/6 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="prose mt-4 dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-1">Domains</h2>
                <p className="whitespace-pre-line text-sm capitalize">{data.domain}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              About the Worker
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
                    data.name
                  )}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  {isLoading ? (
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  ) : (
                    <span className="text-sm">{getAge(data.date_of_birth)} years old</span>
                  )}
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

      {/* Not Logged In Warning Modal */}
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
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Not Logged In</h2>
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
                      window.location.href = `tel:${data?.mobile}`;
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
