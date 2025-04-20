'use client';

import { Button } from '@/components/ui/Button';
import getSingleWorkerService from '@/services/get-single-worker';
import { Heart, Mail, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function JobDetailPage() {
  const { slug } = useParams();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  console.log('data', data)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await getSingleWorkerService(slug as string);
        setData(response.data?.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load job');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchJob();
  }, [slug]);

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
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
                {loading ? (
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                ) : (
                  <span className='capitalize ' >{data.name}</span>
                )}
              </h1>

              <span
                onClick={toggleWishlist}
                className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 ${isWishlisted ? 'text-red-500' : 'text-gray-400'
                  }`}
              >
                <Heart
                  className={`w-6 h-6 ${isWishlisted ? 'fill-red-500' : 'fill-transparent'
                    } transition-all duration-300`}
                />
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">


              <div className="flex items-center gap-1">
                <Mail className="w-5 h-5" />
                {loading ? (
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  <Link href={`mailto:${data.email}`} className="text-[15px] cursor-pointer">
                    {data.email}
                  </Link>
                )}
              </div>
            </div>

            <h1 className="text-2xl text-primary-500 capitalize font-semibold mb-2">
              {loading ? (
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ) : (
                `₹ ${data.salary}`
              )}
            </h1>

            <div className="flex items-center gap-1 mt-4">
              <MapPin className="w-5 h-5  " />
              {loading ? (
                <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ) : (
                <span className='capitalize text-sm '>
                  {`${data.area}, ${data.city}`}
                </span>
              )}
            </div>


            {loading ? (
              <div className="mt-4 space-y-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 w-1/2 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-5/6 rounded animate-pulse"></div>
              </div>
            ) : (
              // data.description && (
              <div className="prose mt-4 dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-1">Domains</h2>
                <p className="whitespace-pre-line text-sm capitalize">{data.domain}</p>
              </div>
              // )
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
                  {loading ? (
                    <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  ) : (
                    data.name
                  )}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  {/* <Contact className="w-5 h-5" /> */}
                  {loading ? (
                    <div className="h-4 w-20  bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  ) : (
                    <span className='text-sm' >{getAge(data.date_of_birth)} years old</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
          ) : (
            <Link href={`tel:${data.mobile}`}>
              <Button className="w-full">Call Now</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
