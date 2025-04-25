'use client'

import { Share2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share';

interface ShareButtonsProps {
    url: string;
    title?: string;
}

const ShareButtons = ({ url, title = 'Check this out!' }: ShareButtonsProps) => {
    const [open, setOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false); // State to handle copy success
    const popupRef = useRef<HTMLDivElement>(null);

    const frontEndUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;
    const fullUrl = `${frontEndUrl}${url}`;

    const togglePopup = () => setOpen(prev => !prev);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullUrl)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000); // Reset success state after 2 seconds
            })
            .catch(err => console.error('Failed to copy text: ', err));
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative ml-4" ref={popupRef}>
            <Share2
                className="w-6 h-6 cursor-pointer text-gray-600 hover:text-primary-400"
                onClick={togglePopup}
            />
            {open && (
                <div className="absolute z-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 flex gap-2 top-8 right-0 transition-all duration-300">
                    <FacebookShareButton url={fullUrl}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <WhatsappShareButton url={fullUrl}>
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>

                    {/* Copy Path Button */}
                    <button
                        onClick={copyToClipboard}
                        className="w-[120px] py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
                    >
                        {copySuccess ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShareButtons;
