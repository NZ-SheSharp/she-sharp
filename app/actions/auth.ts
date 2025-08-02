'use server';

import { signIn as nextAuthSignIn } from '@/lib/auth/auth.config';
import { redirect } from 'next/navigation';

export async function signInWithOAuth(provider: string) {
  await nextAuthSignIn(provider, {
    redirectTo: '/dashboard',
  });
}

export async function signInWithGoogle() {
  await nextAuthSignIn('google', {
    redirectTo: '/dashboard',
  });
}

export async function signInWithGitHub() {
  await nextAuthSignIn('github', {
    redirectTo: '/dashboard',
  });
}