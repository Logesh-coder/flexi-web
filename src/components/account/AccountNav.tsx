'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Heart, Settings, UserX } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/account/settings', label: 'Settings', icon: Settings },
  { href: '/account/saved', label: 'Wishlist', icon: Heart },
  { href: '/account/jobs', label: 'Posted Jobs', icon: Briefcase },
];

export function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('TOKEN');
    router.push('/');
  };

  return (
    <>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center px-4 py-2 text-sm font-medium rounded-lg
                ${isActive
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          );
        })}

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <UserX className="mr-3 h-5 w-5" />
          Logout
        </button>
      </nav>

      {/* Modal with Framer Motion */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-sm shadow-xl"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Confirm Logout</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
