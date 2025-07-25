'use client'
import { ArrowRight, Briefcase, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Hero() {
  const route = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    setIsLoggedIn(!!token && token !== "null" && token !== "");
  }, [pathname]);

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find The Flexible Jobs
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Make money make every day.
          </p>
          <div className='max-md:hidden flex justify-center'>
            <Link href='/jobs' className="hover:bg-primary-800 border  text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors">
              Search
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className='md:hidden'>
            <div className=" flex justify-center gap-6 items-center">
              <div onClick={() => route.push('/jobs')} className='cursor-pointer w-[180px] h-[160px] rounded-xl border-2 border-gray-300 shadow  bg-white flex flex-col justify-between px-2 py-2' >
                <div className='!text-start' >
                  <h4 className='text-black text-xl font-semibold ' >Job</h4>
                  <p className='text-gray-500  text-sm' >Search Jobs</p>
                </div>

                <div className="flex justify-between">
                  <div className='bg-primary-500 rounded-full w-8 h-8 flex items-center justify-center' >
                    <ArrowRight />
                  </div>
                  <Briefcase className=' w-8 h-8 text-primary-500' />
                </div>
              </div>

              <div onClick={() => route.push('/workers')} className='cursor-pointer w-[180px] h-[160px] rounded-xl border-2 border-gray-300 shadow  bg-white flex flex-col justify-between px-2 py-2' >
                <div className='!text-start' >
                  <h4 className='text-black text-xl font-semibold ' >Worker</h4>
                  <p className='text-gray-500  text-sm' >Search Workers</p>
                </div>

                <div className="flex justify-between">
                  <div className='bg-primary-500 rounded-full w-8 h-8 flex items-center justify-center' >
                    <ArrowRight />
                  </div>
                  <UsersRound className=' w-8 h-8 text-primary-500' />
                </div>
              </div>

            </div>

            <div className='flex flex-col items-center justify-center mt-6'>
              <h6 className='mb-4'>(or)</h6>
              {isLoggedIn ? (
                <Link href='/jobs/post' className="hover:bg-primary-800 border-2 min-[414px]:w-[380px] w-full text-white px-8 py-3 rounded-full flex items-center justify-between gap-2 transition-colors font-semibold">
                  Post Job
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link href='/login' className="hover:bg-primary-800 border-2 min-[414px]:w-[380px] w-full text-white px-8 py-3 rounded-full flex items-center justify-between gap-2 transition-colors font-semibold">
                  Post Job
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}