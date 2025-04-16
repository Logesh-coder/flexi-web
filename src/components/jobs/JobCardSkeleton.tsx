export const JobCardSkeleton = () => {
    return (
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
            {/* Top-right menu */}
            <div className="absolute top-4 right-4 h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full" />

            {/* Title */}
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-4" />

            {/* Meta Info */}
            <div className="flex flex-col gap-2 mb-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
            </div>

            {/* Budget */}
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4" />

            {/* Location */}
            <div className="flex flex-col gap-2 mb-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
            </div>

            {/* Bottom link */}
            <div className="h-3 w-20 ml-auto bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
    );
};
