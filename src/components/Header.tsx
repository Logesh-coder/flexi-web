'use client';
import { User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import { ThemeSwitch } from './theme-switch';

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const pathname = usePathname();

  console.log('pathname', pathname)

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    setIsLoggedIn(!!token && token !== "null" && token !== "");
  }, [pathname]);


  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-primary-700 dark:text-primary-400"
            >
              Flxei
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/jobs"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 ${pathname == '/jobs' && 'text-primary-500 dark:text-primary-500 '} `}
            >
              Find Jobs
            </Link>
            <Link
              href="/workers"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 ${pathname == '/workers' && 'text-primary-500 dark:text-primary-500'} `}
            >
              Find Workers
            </Link>
            <Link
              href="/help-an-support"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 ${pathname == '/help-an-support' && 'text-primary-500 dark:text-primary-500'} `}
            >
              Help & Support
            </Link>
          </div>

          <div className="flex items-center ">
            <ThemeSwitch />

            {isLoggedIn ? (
              <div className='flex' >
                <Link
                  href="/account/settings"
                  className=" flex items-center  mr-4 ml-2 text-primary-700 hover:underline rounded-lg"
                >
                  <User className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/jobs/post"
                  className="space-x-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <span>Post Job</span>
                </Link>
              </div>
            ) : (

              <>
                {pathname !== '/login' && (
                  <Link
                    href="/login"
                    className="text-sm ml-2 border-primary-500 border text-primary-500 px-4 py-[8px] rounded-lg"
                  >
                    Sign In
                  </Link>
                )}
              </>

            )}
          </div>
        </div>
      </div>
    </header>
  );
}
