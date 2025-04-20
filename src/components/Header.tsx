'use client';
import { Menu, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import { ThemeSwitch } from './theme-switch';

export function Header() {
  const [isLogged, setIsLogged] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    setIsLogged(token);
    console.log("isLogged", token);
  }, [pathname]);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-primary-600 dark:text-primary-400"
            >
              Flxei
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/jobs"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Find Jobs
            </Link>
            <Link
              href="/workers"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Find Workers
            </Link>
            <Link
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeSwitch />
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full md:hidden transition-colors">
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            {isLogged ? (
              <div className='flex' >
                <Link
                  href="/account/settings"
                  className=" md:flex items-center mx-4 text-primary-700 hover:underline rounded-lg"
                >
                  <User className="w-4 h-4" />
                  <span>profile</span>
                </Link>
                <Link
                  href="/jobs/post"
                  className="space-x-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <span>Post Job</span>
                </Link>
              </div>
            ) : (
              <div
                className="hidden md:flex items-center gap-3 text-sm text-black dark:text-white rounded-lg transition-colors"
              >
                <Link href="/register">Sign up</Link>
                <span>/</span>
                <Link href="/login">Sign In</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
