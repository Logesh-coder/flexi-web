'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('TOKEN', token);
            router.push('/');
        } else {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-500 text-sm">Logging you in...</p>
        </div>
    );
}
