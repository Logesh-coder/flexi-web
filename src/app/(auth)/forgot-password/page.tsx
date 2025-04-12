'use client';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import forgotService from '@/services/auth/forgot';
import { forgotValidator } from '@/validators/auth.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function forgotPassword() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(forgotValidator),
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: any) => {
        setLoading(true);

        try {
            const res = await forgotService(data);

            if (res?.status === 200) {
                router.push('/mail-indication')
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

                {error && <span className=' text-sm text-red-400 ' >{error}</span>}

                {loading ? (
                    <div className="w-full px-4 py-2 bg-primary-400 text-white dark:bg-primary-400 inline-flex items-center justify-center rounded-lg font-medium transition-colors">
                        loading...
                    </div>
                ) : (
                    <Button type="submit" className="w-full">
                        Continue
                    </Button>
                )}
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
