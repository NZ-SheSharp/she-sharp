'use client';

import { useEffect, useState } from 'react';
import { OAuthButtons } from './oauth-buttons';

interface OAuthWrapperProps {
  mode: 'signin' | 'signup';
}

export function OAuthWrapper({ mode }: OAuthWrapperProps) {
  const [providers, setProviders] = useState<{
    google: boolean;
    github: boolean;
  } | null>(null);

  useEffect(() => {
    fetch('/api/auth/providers')
      .then(res => res.json())
      .then(data => setProviders(data.providers))
      .catch(err => console.error('Failed to fetch providers:', err));
  }, []);

  // Don't render if no providers are configured
  if (!providers || (!providers.google && !providers.github)) {
    return null;
  }

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <OAuthButtons mode={mode} />
    </>
  );
}