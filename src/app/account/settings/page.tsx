'use client'

import { ProfileSettings } from '@/components/account/ProfileSettings'
import { NotificationSettings } from '@/components/account/NotificationSettings'
import { SecuritySettings } from '@/components/account/SecuritySettings'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
      <ProfileSettings />
      <NotificationSettings />
      <SecuritySettings />
    </div>
  )
}