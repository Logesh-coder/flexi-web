import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { User, Mail, MapPin, Link as LinkIcon } from 'lucide-react'

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    location: 'New York, USA',
    bio: 'Full-stack developer with 5 years of experience...',
    website: 'https://johndoe.dev',
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Profile Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <User className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          <Button variant="outline">Change Photo</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            icon={User}
            label="Full Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <Input
            icon={Mail}
            label="Email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <Input
            icon={MapPin}
            label="Location"
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          />
          <Input
            icon={LinkIcon}
            label="Website"
            type="url"
            value={profile.website}
            onChange={(e) => setProfile({ ...profile, website: e.target.value })}
          />
        </div>

        <Textarea
          label="Bio"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          rows={4}
        />

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}