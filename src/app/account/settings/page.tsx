'use client'

import { ProfileSettings } from "@/components/account/ProfileSettings"
import { SecuritySettings } from "@/components/account/SecuritySettings"

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-md:mx-4">
      <h1 className="sm:text-2xl text-xl font-bold text-gray-900 max-sm:my-3 dark:text-white">Account Settings</h1>
      <ProfileSettings />
      <SecuritySettings />
    </div>
  )
}