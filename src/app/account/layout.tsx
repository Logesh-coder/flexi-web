'use client'

import { AccountNav } from '@/components/account/AccountNav'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Desktop layout with sidebar and content */}
      <div className="hidden lg:grid grid-cols-4 gap-8">
        <AccountNav />
        <div className="lg:col-span-3">
          {children}
        </div>
      </div>

      {/* Mobile layout: show nav links only */}
      <div className="lg:hidden">
        <AccountNav />
      </div>
    </div>
  )
}
