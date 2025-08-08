import { Suspense } from 'react';
import MentorApplications from '@/components/admin/MentorApplications';
import { Skeleton } from '@/components/ui/skeleton';

export default function MentorApplicationsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mentor Applications</h1>
          <p className="text-gray-600 mt-2">
            Review and verify mentor applications
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            Auto-refresh every 30 seconds
          </span>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Bulk Approve
          </button>
        </div>
      </div>

      {/* Mentor Applications Component */}
      <Suspense fallback={<ApplicationsSkeleton />}>
        <MentorApplications />
      </Suspense>
    </div>
  );
}

function ApplicationsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-48" />
      ))}
    </div>
  );
}