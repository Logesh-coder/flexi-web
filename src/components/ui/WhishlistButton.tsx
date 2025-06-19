'use client';

import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

interface WishlistButtonProps {
    isSaved: boolean | string;
    isPostingPage: boolean;
    toggleWishlist: () => void;
}

export default function WishlistButton({
    isSaved,
    isPostingPage,
    toggleWishlist,
}: WishlistButtonProps) {
    const handleClick = () => {
        if (isPostingPage) return;

        const token = localStorage.getItem('TOKEN');
        if (!token) {
            toast.error('Please login to add to wishlist');
            return;
        }

        toggleWishlist();
    };

    return (
        <span
            onClick={handleClick}
            className={`
        cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110
        ${isSaved ? 'text-red-500' : 'text-gray-400'}
        ${isPostingPage ? 'pointer-events-none opacity-50' : ''}
      `}
        >
            <Heart
                className={`w-6 h-6 ${isSaved ? 'fill-red-500' : 'fill-transparent'
                    } transition-all duration-300`}
            />
        </span>
    );
}
