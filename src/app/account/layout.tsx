'use client'

import { AccountNav } from '@/components/account/AccountNav';
import { useEffect, useState } from 'react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  if (isMobile) {
    return <>{children}</>;
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