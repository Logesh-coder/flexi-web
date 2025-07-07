'use client'

import { AccountNav } from '@/components/account/AccountNav';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  if (isMobile) {
    return (
      <div>
        {children}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="max-md:hidden lg:grid grid-cols-4 gap-8">
        <AccountNav />
        <div className="lg:col-span-3">
          {children}
        </div>
      </div>
    </div>
  )
}