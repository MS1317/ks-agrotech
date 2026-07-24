'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Admin Panel Error caught by boundary:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-red-50 p-6 rounded-lg border border-red-200">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
            <p className="text-gray-700 mb-6 text-center max-w-md">
                An unexpected error occurred in this section of the admin panel.
                <br /><br />
                <b>Error details:</b> <span className="text-sm font-mono bg-red-100 px-2 py-1 rounded">{error.message || 'Unknown error'}</span>
            </p>

            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
