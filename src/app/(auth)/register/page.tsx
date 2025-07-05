'use client';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import registerService from '@/services/auth/register';
import { registerValidator } from '@/validators/auth.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { Calendar, Lock, Mail, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function RegisterPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidator),
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const res = await registerService(data);

      if (res?.status === 201) {
        console.log('Registration successful:', res.data);
        router.push('/login')
      }

    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMSG = axiosError.response?.data?.message || "An unexpected error occurred";
      setError(errorMSG)
    } finally {
      setLoading(false)
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start your freelancing journey"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              icon={User}
              type="text"
              placeholder="Full name"
              {...field}
              error={errors.name?.message as string}
            />
          )}
        />

        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <Input
              icon={Phone}
              type="number"
              placeholder="Mobile"
              {...field}
              error={errors.mobile?.message as string}
            />
          )}
        />

        <Controller
          name="date_of_birth"
          control={control}
          render={({ field }) => (
            <Input
              icon={Calendar}
              type="date"
              placeholder="DOB"
              {...field}
              error={errors.date_of_birth?.message as string}
              maxDate={new Date()}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              icon={Mail}
              type="email"
              placeholder="Email address"
              {...field}
              error={errors.email?.message as string}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              {...field}
              error={errors.password?.message as string}
            />
          )}
        />

        {error && <span className="text-sm text-red-400">{error}</span>}

        {loading ? (
          <div className="w-full px-4 py-2 bg-primary-400 text-white dark:bg-primary-400 inline-flex items-center justify-center rounded-lg font-medium transition-colors">
            loading...
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Create account
          </Button>
        )}
      </form>


      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-primary-600 hover:text-primary-500">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
