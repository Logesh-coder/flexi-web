'use client';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import loginService from '@/services/auth/login';
import { loginValidator } from '@/validators/auth.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { Lock, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import googleImg from '../../../../public/icons/google.png';

export default function LoginPage() {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidator),
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const watchPass = watch('password');
  const watchMail = watch('email');

  useEffect(() => {
    setError('');
  }, [watchMail, watchPass])

  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const res = await loginService(data);

      if (res?.status === 200) {
        const token = res.data?.data?.token
        const isActive = res.data?.data?.isActive

        localStorage.setItem('TOKEN', token)
        if (isActive) {
          router.push('/')
        } else {
          router.push('/account/settings')
        }
      }

    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMSG = axiosError.response?.data?.message || "An unexpected error occurred";
      setError(errorMSG)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      router.push('/');
    }
  }, []);


  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  {...field}
                  error={errors?.email?.message as string}
                  placeholder="Email address"
                  icon={Mail}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  icon={Lock}
                  type="password"
                  {...field}
                  error={errors?.password?.message as string}
                  placeholder="Password"
                />
              )}
            />
          </div>
        </div>

        {error && <span className=' text-sm text-red-400 ' >{error}</span>}

        <div className="w-full text-end my-2">
          <Link
            href="/forgot-password"
            className="text-primary-600 underline text-sm my-0 hover:text-primary-500"
          >
            Forget Password ?
          </Link>
        </div>

        {loading ? (
          <div className="w-full px-4 py-2 bg-primary-400 text-white dark:bg-primary-400 inline-flex items-center justify-center rounded-lg font-medium transition-colors">
            loading...
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        )}

        <div className="mt-6">
          <button
            type="button"
            className="w-full flex justify-center items-center gap-2 shadow p-2 border border-border rounded-md  "
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/user/google`;
            }}
          >
            <Image src={googleImg} alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>
        </div>

      </form>

      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <Link
          href="/register"
          className="text-primary-600 hover:text-primary-500"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
