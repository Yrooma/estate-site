'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">عذراً! حدث خطأ ما</h2>
        <p className="text-gray-600 mb-4">نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى</p>
        <button
          onClick={reset}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          حاول مرة أخرى
        </button>
      </div>
    </div>
  );
} 