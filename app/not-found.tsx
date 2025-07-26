import Link from 'next/link';
import { CircleIcon } from 'lucide-react';
import { StandalonePageLayout } from '@/components/standalone-page-layout';

export default function NotFound() {
  return (
    <StandalonePageLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-light/20 to-periwinkle-light/20">
        <div className="max-w-md space-y-8 p-8 text-center bg-white rounded-2xl shadow-lg">
          <div className="flex justify-center">
            <div className="p-4 bg-purple-light rounded-full">
              <CircleIcon className="size-12 text-purple-dark" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-navy-dark tracking-tight">
            Page Not Found
          </h1>
          <p className="text-base text-gray">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link
            href="/"
            className="max-w-48 mx-auto flex justify-center py-3 px-6 border-2 border-purple-dark rounded-full shadow-sm text-sm font-medium text-purple-dark bg-white hover:bg-purple-light hover:text-purple-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-dark"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </StandalonePageLayout>
  );
}
