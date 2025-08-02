import { signInWithGoogle, signInWithGitHub } from '@/app/actions/auth';

interface OAuthFormProps {
  provider: 'google' | 'github';
  children: React.ReactNode;
}

export function OAuthForm({ provider, children }: OAuthFormProps) {
  const action = provider === 'google' ? signInWithGoogle : signInWithGitHub;
  
  return (
    <form action={action}>
      {children}
    </form>
  );
}