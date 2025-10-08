'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // Preserve hash fragment when redirecting to static HTML file
    const currentHash = window.location.hash || '';
    window.location.replace('/admin/index.html' + currentHash);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Decap CMS Admin...</p>
      </div>
    </div>
  );
}
