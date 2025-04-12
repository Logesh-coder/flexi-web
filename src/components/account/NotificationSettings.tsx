import { useState } from 'react'
import { Switch } from '@/components/ui/Switch'

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    newMessages: true,
    applicationUpdates: true,
    jobRecommendations: false,
    marketingEmails: false,
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Notification Preferences</h2>
      
      <div className="space-y-6">
        <Switch
          label="New Messages"
          description="Get notified when you receive new messages"
          checked={notifications.newMessages}
          onChange={(checked) => setNotifications({ ...notifications, newMessages: checked })}
        />
        
        <Switch
          label="Application Updates"
          description="Receive updates about your job applications"
          checked={notifications.applicationUpdates}
          onChange={(checked) => setNotifications({ ...notifications, applicationUpdates: checked })}
        />
        
        <Switch
          label="Job Recommendations"
          description="Get personalized job recommendations"
          checked={notifications.jobRecommendations}
          onChange={(checked) => setNotifications({ ...notifications, jobRecommendations: checked })}
        />
        
        <Switch
          label="Marketing Emails"
          description="Receive news and special offers"
          checked={notifications.marketingEmails}
          onChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
        />
      </div>
    </div>
  )
}