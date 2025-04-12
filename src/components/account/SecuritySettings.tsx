import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Lock } from 'lucide-react'

export function SecuritySettings() {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Security</h2>
      
      <form className="space-y-6">
        <Input
          icon={Lock}
          label="Current Password"
          type="password"
          value={passwords.current}
          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
        />
        
        <Input
          icon={Lock}
          label="New Password"
          type="password"
          value={passwords.new}
          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
        />
        
        <Input
          icon={Lock}
          label="Confirm New Password"
          type="password"
          value={passwords.confirm}
          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
        />

        <div className="flex justify-end">
          <Button type="submit">Update Password</Button>
        </div>
      </form>
    </div>
  )
}