'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import editProfile from '@/services/edit-profile';
import myProfile from '@/services/my-profile';
import { profileSchema } from '@/validators/profile.validation';

import { Calendar as CalendarIcon, IndianRupee, Mail, Phone, User } from 'lucide-react';
import { CityAreaSelector } from '../CityAreaSelector';
import Input from '../ui/Input';
import { Textarea } from '../ui/Textarea';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

interface ProfileFormValues {
  name: string;
  email: string;
  mobile: string;
  date_of_birth: string;
  domain: string;
  salary: string;
  city: string;
  area: string;
  isActive?: boolean;
}

const today = new Date();
const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

function SkeletonBox({
  height = 'h-10',
  width = 'w-full',
  className = '',
}: {
  height?: string;
  width?: string;
  className?: string;
}) {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${height} ${width} ${className}`} />
  );
}

export function ProfileSettings() {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [originalData, setOriginalData] = useState<ProfileFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      date_of_birth: '',
      domain: '',
      salary: '',
      city: '',
      area: '',
    },
  });

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await myProfile();
      const data = response?.data?.data;
      reset(data);
      setOriginalData(data);
    } catch (err) {
      console.error('Failed to load profile', err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSaveChanges = handleSubmit(async (data) => {
    try {
      const response = await editProfile(data);
      if (response.status === 200) {
        setAlertType('success');
        setAlertMessage('Profile updated successfully!');
        await fetchProfile();
      } else {
        setAlertType('error');
        setAlertMessage('Failed to update profile');
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setAlertType('error');
      setAlertMessage(error.response?.data?.message || 'Something went wrong');
    }
  });

  useEffect(() => {
    fetchProfile();
  }, [reset]);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const profileValues = watch();

  const hasChanges = originalData
    ? Object.entries(profileValues).some(([key, value]) => {
      const original = originalData[key as keyof ProfileFormValues];
      const current = value ?? '';
      const base = original ?? '';
      return String(current).trim() !== String(base).trim();
    })
    : false;

  const missingFields: string[] = [];
  if (!profileValues.mobile) missingFields.push('mobile');
  if (!profileValues.date_of_birth) missingFields.push('Date of Birth');
  if (!profileValues.city) missingFields.push('city');
  if (!profileValues.area) missingFields.push('area');
  if (!profileValues.domain) missingFields.push('work domains');

  console.log('isLoading', isLoading)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gary-500 p-6">


      {isLoading ? (
        <>
          <div className="space-y-6">
            <SkeletonBox height="h-6" width="w-48" className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonBox key={i} height="h-10" className="rounded-lg" />
              ))}
            </div>
            <SkeletonBox height="h-24" className="rounded-lg" />
            <div className="flex justify-end">
              <SkeletonBox height="h-10" width="w-32" className="rounded-lg" />
            </div>
          </div>
        </>
      ) : (
        <>
          {profileValues.isActive === false && (
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

          <form onSubmit={handleSaveChanges} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    icon={User}
                    label="Full Name"
                    {...field}
                    error={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    icon={Mail}
                    label="Email"
                    type="email"
                    className="cursor-not-allowed"
                    disabled
                    {...field}
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <Input
                    icon={Phone}
                    label="Mobile"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '');
                      field.onChange(digits);
                    }}
                    value={field.value}
                    error={errors.mobile?.message}
                  />
                )}
              />

              <Controller
                name="date_of_birth"
                control={control}
                render={({ field }) => (
                  <Input
                    type="date"
                    label="Date of Birth"
                    icon={CalendarIcon}
                    value={field.value}
                    onChange={(e: string) =>
                      setValue('date_of_birth', e, { shouldDirty: true })
                    }
                    minDate={new Date('1900-01-01')}
                    maxDate={minAgeDate}
                    setValue={setValue as (field: string, value: any, options?: object) => void}
                    name="date_of_birth"
                    error={errors.date_of_birth?.message}
                  />
                )}
              />

              <CityAreaSelector
                city={watch('city')}
                area={watch('area')}
                setValue={(
                  field: keyof ProfileFormValues,
                  value: any
                ) => setValue(field, value, { shouldDirty: true })}
                register={register}
                errors={errors}
              />

              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <Input
                    icon={IndianRupee}
                    label="Your Daily Salary"
                    type="number"
                    placeholder="(min. 250)"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={errors.salary?.message}
                  />
                )}
              />
            </div>

            <Controller
              name="domain"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Your Working Domains (ex: catering service man or electrical helper)"
                  {...field}
                  error={errors.domain?.message}
                />
              )}
            />

            <div className="flex justify-end">
              <button
                disabled={!hasChanges}
                type="submit"
                className={`text-sm px-3 py-2 rounded-lg text-white transition-colors duration-200 ${hasChanges
                  ? 'bg-primary-500 hover:bg-primary-600'
                  : 'bg-primary-300 cursor-not-allowed'
                  }`}
              >
                Save Changes
              </button>
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
          </form>
        </>
      )}
    </div>
  );
}
