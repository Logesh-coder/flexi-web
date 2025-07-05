'use client';

import { Heart, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface WishlistButtonProps {
    isSaved: boolean | string;
    isPostingPage?: boolean;
    toggleWishlist: () => Promise<void>; // since it's async
}

export default function WishlistButton({
    isSaved,
    isPostingPage,
    toggleWishlist,
}: WishlistButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (isPostingPage) return;

        const token = localStorage.getItem('TOKEN');
        if (!token) {
            toast.error('Please login to add to wishlist');
            return;
        }

        try {
            setLoading(true);
            await toggleWishlist();
        } catch (err) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <span
            onClick={loading ? undefined : handleClick}
            className={`
        cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110
        ${isSaved ? 'text-red-500' : 'text-gray-400'}
        ${isPostingPage || loading ? 'pointer-events-none opacity-50' : ''}
      `}
        >
            {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
                <Heart
                    className={`w-6 h-6 ${isSaved ? 'fill-red-500' : 'fill-transparent'} transition-all duration-300`}
                />
            )}
        </span>
    );
}
