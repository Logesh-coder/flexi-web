import editProfile from '@/services/edit-profile';
import myProfile from '@/services/my-profile';
import { AxiosError } from 'axios';
import { Calendar as CalendarIcon, IndianRupee, Link as LinkIcon, Mail, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { CityAreaSelector } from '../CityAreaSelector';
import Input from '../ui/Input';
import { Textarea } from '../ui/Textarea';

interface Profile {
  _id: string;
  name: string;
  email: string;
  mobile: number;
  date_of_birth: string;
  instaProfileLink?: string;
  domain?: string;
  salary?: string;
  city?: string;
  area?: string;
  isActive: Boolean
}

export function ProfileSettings() {
  const [originalProfile, setOriginalProfile] = useState<Partial<Profile>>({});
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ salary?: string; mobile?: string }>({});

  const hasChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile);

  const handleSaveChanges = async () => {
    const errors: { salary?: string; mobile?: string } = {};

    // Mobile Validation (if entered)
    const mobileStr = profile.mobile?.toString();
    if (mobileStr && mobileStr.length !== 10) {
      errors.mobile = 'Mobile number must be exactly 10 digits';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;
    if (hasChanges) {
      try {
        const response = await editProfile(profile);
        if (response.status === 200) {
          setAlertType('success');
          setAlertMessage('Profile updated successfully!');
          setOriginalProfile(profile);
        } else {
          setAlertType('error');
          setAlertMessage('Failed to update profile');
        }
      } catch (err) {
        setAlertType('error');
        const error = err as AxiosError<{ message: string }>;
        setAlertMessage(error.response?.data?.message || 'Something went wrong');
      }
    }
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await myProfile();
        setProfile(response?.data?.data);
        setOriginalProfile(response?.data?.data)
      } catch (err: any) {
        console.error('Failed to load profile', err);
      }
    };

    fetchProfile();
  }, [alertMessage]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">

      {profile.isActive == false && (
        <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">
            Your account is not active. Please enter your city, area, and work domains to activate it.
          </div>
        </div>
      )}

      <h2 className="sm:text-xl text-base font-semibold mb-6 text-gray-900 dark:text-white">Profile Information</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            icon={User}
            label="Full Name"
            value={profile.name || ''}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <Input
            icon={Mail}
            label="Email"
            type="email"
            className="cursor-not-allowed"
            disabled
            value={profile.email || ''}
          />

          <div>
            <Input
              icon={Phone}
              label="Mobile"
              value={profile.mobile?.toString() || ''}
              onChange={(e) => setProfile({ ...profile, mobile: Number(e.target.value) })}
            />

            {validationErrors.mobile && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.mobile}</p>
            )}
          </div>

          {/* Date of Birth Input with Calendar */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                readOnly
                value={
                  profile.date_of_birth
                    ? new Date(profile.date_of_birth).toLocaleDateString('en-GB') // DD-MM-YYYY format
                    : ''
                }
                onClick={() => setShowCalendar((prev) => !prev)}
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  dark:focus:ring-primary-500 dark:focus:border-primary-500
                  pl-10 pr-4 py-2"
              />

              {showCalendar && (
                <div className="absolute z-50 mt-2 shadow-lg rounded-lg bg-white dark:bg-gray-800">
                  <Calendar
                    onChange={(date) => {
                      if (date instanceof Date) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const formattedDate = `${year}-${month}-${day}`; // e.g., 2024-04-12
                        setProfile({ ...profile, date_of_birth: formattedDate });
                        setShowCalendar(false);
                      }
                    }}
                    className="!w-full dark:!bg-black"
                    value={profile.date_of_birth ? new Date(profile.date_of_birth) : null}
                  />

                </div>
              )}
            </div>
          </div>

          <div>
            <Input
              icon={IndianRupee}
              label="Your Daily Salary"
              type="number"
              placeholder='(min. 250)'
              value={profile.salary || ''}
              onChange={(e) => setProfile({ ...profile, salary: e.target.value })}
            />
            {validationErrors.salary && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.salary}</p>
            )}
          </div>

          <Input
            icon={LinkIcon}
            label="Instagram Profile Link"
            type="url"
            value={profile.instaProfileLink || ''}
            onChange={(e) => setProfile({ ...profile, instaProfileLink: e.target.value })}
          />

          <CityAreaSelector profile={profile} setProfile={setProfile} />
        </div>

        <Textarea
          label='Your Working Domains (ex : catering service man or electrical helper) '
          value={profile.domain || ''}
          onChange={(e) => setProfile({ ...profile, domain: e.target.value })}
        />

        <div className="flex justify-end">
          <button
            disabled={!hasChanges}
            className={`text-sm px-3 py-2 rounded-lg text-white transition-colors duration-200 ${hasChanges ? 'bg-primary-500 hover:bg-primary-600' : 'bg-primary-300 cursor-not-allowed'
              }`}
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>

      {alertMessage && (
        <div
          className={`p-4 mb-4 text-sm rounded-lg ${alertType === 'success'
            ? 'text-green-800 bg-green-100'
            : 'text-red-800 bg-red-100'
            }`}
          role="alert"
        >
          {alertMessage}
        </div>
      )}

    </div>
  );
}
