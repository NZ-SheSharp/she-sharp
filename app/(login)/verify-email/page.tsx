'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Mail, RefreshCw } from 'lucide-react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationStatus('success');
        setMessage('Your email has been verified successfully!');
        setTimeout(() => {
          router.push('/sign-in?verified=true');
        }, 3000);
      } else {
        setVerificationStatus('error');
        setMessage(data.error || 'Failed to verify email. The link may be invalid or expired.');
      }
    } catch (err) {
      setVerificationStatus('error');
      setMessage('An error occurred while verifying your email.');
    } finally {
      setIsVerifying(false);
    }
  };

  const resendVerification = async () => {
    if (!email) {
      setMessage('Email address not found. Please sign up again.');
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Verification email sent! Please check your inbox.');
      } else {
        setMessage('Failed to resend verification email. Please try again.');
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  // If token is provided, show verification in progress or result
  if (token) {
    if (isVerifying) {
      return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <RefreshCw className="h-8 w-8 text-purple-600 animate-spin" />
              </div>
              <CardTitle>Verifying Your Email</CardTitle>
              <CardDescription className="mt-2">
                Please wait while we verify your email address...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      );
    }

    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              {verificationStatus === 'success' ? (
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <CardTitle>
              {verificationStatus === 'success' ? 'Email Verified!' : 'Verification Failed'}
            </CardTitle>
            <CardDescription className="mt-2">{message}</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-2">
            {verificationStatus === 'success' ? (
              <p className="text-center text-sm text-gray-600">
                Redirecting to sign in page...
              </p>
            ) : (
              <>
                <Link href="/sign-up" className="w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Sign Up Again
                  </Button>
                </Link>
                <Link href="/sign-in" className="w-full">
                  <Button variant="outline" className="w-full">
                    Go to Sign In
                  </Button>
                </Link>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }

  // If no token, show the email verification pending page
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription className="mt-2">
            We've sent a verification link to your email address
            {email && (
              <>
                <br />
                <strong className="text-gray-700">{email}</strong>
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription>
              Please check your email inbox and click the verification link to activate your account.
              The link will expire in 24 hours.
            </AlertDescription>
          </Alert>
          
          {message && (
            <Alert className={message.includes('sent') ? '' : 'border-red-200 bg-red-50'}>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the email? Check your spam folder or
            </p>
            <Button
              onClick={resendVerification}
              disabled={isResending || !email}
              variant="outline"
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/sign-in" className="w-full">
            <Button variant="ghost" className="w-full">
              Back to Sign In
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}