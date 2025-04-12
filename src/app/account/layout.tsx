'use client'

import { AccountNav } from '@/components/account/AccountNav'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <AccountNav />
        <div className="lg:col-span-3">
          {children}
        </div>
      </div>
    </div>
  )
}