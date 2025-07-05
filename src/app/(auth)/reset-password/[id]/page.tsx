'use client';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import resetPasswordService from '@/services/auth/reset-password';
import { resetValidator } from '@/validators/auth.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function forgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(resetValidator),
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: any) => {
        setLoading(true);

        try {
            const res = await resetPasswordService(data);

            if (res?.status === 200) {
                router.push('/login')
            }

        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMSG = axiosError.response?.data?.message || "An unexpected error occurred";
            setError(errorMSG)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout title="Forget Password" subtitle="Please Enter Your Mail">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                        error={errors?.password?.message}
                    />
                </div>


                <div>
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Confirm Password"
                        {...register('confirmPassword')}
                        error={errors?.password?.message}
                    />
                </div>

                {error && <span className=' text-sm text-red-400 ' >{error}</span>}

                {loading ? (
                    <div className="w-full px-4 py-2 bg-primary-400 text-white dark:bg-primary-400 inline-flex items-center justify-center rounded-lg font-medium transition-colors">
                        loading...
                    </div>
                ) : (
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                )}
            </form>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                    href="/register"
                    className="text-primary-600 hover:text-primary-500"
                >
                    login up
                </Link>
            </p>
        </AuthLayout>
    );
}
