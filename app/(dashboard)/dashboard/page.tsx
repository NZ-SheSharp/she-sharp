'use client';

import dynamic from 'next/dynamic';

// Dynamically import the dashboard component to avoid SSR issues
const DynamicDashboard = dynamic(
  () => import('./DynamicDashboard'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-dark"></div>
      </div>
    )
  }
);

export default function DashboardPage() {
  return <DynamicDashboard />;
}