'use client';

import { WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OfflineNotice() {
    const [isOffline, setIsOffline] = useState<any>(null);

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOffline(!navigator.onLine);
        };

        const goOnline = () => setIsOffline(false);
        const goOffline = () => setIsOffline(true);

        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);
        document.addEventListener('visibilitychange', updateOnlineStatus);

        // Ensure accurate initial check on client render
        updateOnlineStatus();

        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
            document.removeEventListener('visibilitychange', updateOnlineStatus);
        };
    }, []);

    console.log('isOffline', isOffline)

    if (!isOffline) return null;

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 shadow-lg flex items-center gap-2">
            <WifiOff className="w-5 h-5" />
            <span className='w-[190px]'>You are currently offline</span>
        </div>
    );
}
