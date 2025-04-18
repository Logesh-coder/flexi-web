import { Bookmark, Briefcase, Settings, UserX } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/account/settings', label: 'Settings', icon: Settings },
  { href: '/account/saved', label: 'Saved', icon: Bookmark },
  { href: '/account/jobs', label: 'Posted Jobs', icon: Briefcase },
]

export function AccountNav() {
  const pathname = usePathname()
  const router = useRouter();

  const handleLogout = () => {
    console.log('coming')
    localStorage.removeItem('TOKEN');
    router.push('/login');
  };


  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href
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
        )
      })}

      <button
        onClick={() => handleLogout()}
        className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full dark:text-red-400 dark:hover:bg-red-900/20"
      >
        <UserX className="mr-3 h-5 w-5" />
        Logout
      </button>
    </nav>
  )
}