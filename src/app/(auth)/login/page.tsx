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
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import googleImg from '../../../../public/icons/google.png';

function LoginPageComponent() {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidator),
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

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
    const token = searchParams.get('token');
    const isActive = searchParams.get('isActive');

    console.log('isActive', isActive)

    if (token) {
      localStorage.setItem('TOKEN', token)
      if (isActive == 'true') {
        router.push('/')
      } else {
        console.log('loki')
        router.push('/account/settings')
      }
    } else {
      const localToken = localStorage.getItem('TOKEN');
      if (localToken) {
        router.push('/');
      }
    }
  }, [searchParams]);

  return (
    <AuthLayout title="Welcome back" subtitle="Login to your account">
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
            Login
          </Button>
        )}

        <div className="mt-4">
          <button
            type="button"
            className="w-full flex justify-center items-center gap-2 shadow p-2 border border-border rounded-md  "
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/start`;
            }}
          >
            <Image src={googleImg} alt="Google" className="w-5 h-5" />
            Login with Google
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


export default function Page() {
  return (
    <Suspense fallback="Loading...">
      <LoginPageComponent />
    </Suspense>
  )
}
