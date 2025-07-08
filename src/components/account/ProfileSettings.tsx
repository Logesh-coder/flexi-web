'use client';

import editProfile from '@/services/edit-profile';
import myProfile from '@/services/my-profile';
import { AxiosError } from 'axios';
import { Calendar as CalendarIcon, IndianRupee, Mail, Phone, User } from 'lucide-react';
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
  isActive: boolean;
}

export function ProfileSettings() {
  const [originalProfile, setOriginalProfile] = useState<Partial<Profile>>({});
  const [editableProfile, setEditableProfile] = useState<Partial<Profile>>({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hasChanges = JSON.stringify(editableProfile) !== JSON.stringify(originalProfile);

  const missingFields: string[] = [];
  if (!editableProfile?.mobile) missingFields.push('mobile');
  if (!editableProfile?.date_of_birth) missingFields.push('Date of Birth');
  if (!editableProfile?.city) missingFields.push('city');
  if (!editableProfile?.area) missingFields.push('area');
  if (!editableProfile?.domain) missingFields.push('work domains');

  const handleSaveChanges = async () => {
    setSubmitted(true);

    if (missingFields.length > 0) return;

    if (hasChanges) {
      try {
        const response = await editProfile(editableProfile);
        if (response.status === 200) {
          setAlertType('success');
          setAlertMessage('Profile updated successfully!');
          setOriginalProfile(editableProfile);
        } else {
          setAlertType('error');
          setAlertMessage('Failed to update profile');
        }
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        setAlertType('error');
        setAlertMessage(error.response?.data?.message || 'Something went wrong');
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await myProfile();
        setOriginalProfile(response?.data?.data);
        setEditableProfile(response?.data?.data);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      {editableProfile.isActive === false && (
        <div className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
          <svg className="shrink-0 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-sm font-medium">
            {missingFields.length > 0
              ? `Your account is not active. Please enter your ${missingFields.join(', ')} to activate it.`
              : 'Your account is active.'}
          </div>
        </div>
      )}

      <h2 className="sm:text-xl text-base font-semibold mb-6 text-gray-900 dark:text-white">
        Profile Information
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            icon={User}
            label="Full Name"
            value={editableProfile.name || ''}
            onChange={(e) => setEditableProfile({ ...editableProfile, name: e.target.value })}
          />
          <Input
            icon={Mail}
            label="Email"
            type="email"
            className="cursor-not-allowed"
            disabled
            value={editableProfile.email || ''}
          />
          <Input
            icon={Phone}
            label="Mobile"
            type="number"
            value={editableProfile.mobile?.toString() || ''}
            onChange={(e) => setEditableProfile({ ...editableProfile, mobile: Number(e.target.value) })}
          />
          {submitted && !editableProfile.mobile && (
            <p className="absolute left-0 -bottom-5 text-xs text-red-500">Mobile is required</p>
          )}

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                readOnly
                value={
                  editableProfile.date_of_birth
                    ? new Date(editableProfile.date_of_birth).toLocaleDateString('en-GB')
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
                        const formatted = `${year}-${month}-${day}`;
                        setEditableProfile({ ...editableProfile, date_of_birth: formatted });
                        setShowCalendar(false);
                      }
                    }}
                    className="!w-full dark:!bg-black"
                    value={
                      editableProfile.date_of_birth
                        ? new Date(editableProfile.date_of_birth)
                        : undefined
                    }
                  />
                </div>
              )}
            </div>
            {submitted && !editableProfile.date_of_birth && (
              <p className="absolute left-0 -bottom-5 text-xs text-red-500">Date of Birth is required</p>
            )}
          </div>

          <CityAreaSelector profile={editableProfile} setProfile={setEditableProfile} />
          {submitted && (!editableProfile.city || !editableProfile.area) && (
            <p className="absolute left-0 -bottom-5 text-xs text-red-500">City and Area are required</p>
          )}

          <Input
            icon={IndianRupee}
            label="Your Daily Salary"
            type="number"
            placeholder="(min. 250)"
            value={editableProfile.salary || ''}
            onChange={(e) => setEditableProfile({ ...editableProfile, salary: e.target.value })}
          />
        </div>

        <Textarea
          label="Your Working Domains (ex: catering service man or electrical helper)"
          value={editableProfile.domain || ''}
          onChange={(e) => setEditableProfile({ ...editableProfile, domain: e.target.value })}
        />
        {submitted && !editableProfile.domain && (
          <p className="absolute left-0 -bottom-5 text-xs text-red-500">Work domain is required</p>
        )}

        <div className="flex justify-end">
          <button
            disabled={!hasChanges}
            className={`text-sm px-3 py-2 rounded-lg text-white transition-colors duration-200 ${hasChanges
              ? 'bg-primary-500 hover:bg-primary-600'
              : 'bg-primary-300 cursor-not-allowed'
              }`}
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>

      {alertMessage && (
        <div
          className={`p-4 mt-4 text-sm rounded-lg ${alertType === 'success'
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
