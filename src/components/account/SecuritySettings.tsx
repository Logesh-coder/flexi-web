import { Button } from '@/components/ui/Button'
import updatePasswordService from '@/services/auth/update-password'
import { updatePasswordValidator } from '@/validators/auth.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { Lock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Input from '../ui/Input'

export function SecuritySettings() {

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(updatePasswordValidator),
  })

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        currentPassword: data.current,
        newPassword: data.password,
      }
      const response = await updatePasswordService(payload)
      if (response.status === 200) {
        setAlertType('success');
        setAlertMessage('Password updated successfully');
      } else {
        setAlertType('error');
        setAlertMessage('Failed to Password update');
      }
      reset()
    } catch (err) {
      setAlertType('error');
      const error = err as AxiosError<{ message: string }>;
      setAlertMessage(error.response?.data?.message || 'Something went wrong');
    }
  }

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
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Security</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="current"
          control={control}
          render={({ field }) => (
            <Input
              icon={Lock}
              label="Current Password"
              type="password"
              {...field}
              error={errors.current?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              icon={Lock}
              label="New Password"
              type="password"
              {...field}
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              icon={Lock}
              label="Confirm New Password"
              type="password"
              {...field}
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <div className="flex justify-end">
          <Button className='text-sm' type="submit">Update Password</Button>
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
      </form>
    </div>
  )
}