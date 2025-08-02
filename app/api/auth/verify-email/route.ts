import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailToken } from '@/lib/auth/email-verification';
import { z } from 'zod';

const verifySchema = z.object({
  token: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = verifySchema.parse(body);

    const result = await verifyEmailToken(token);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Token is required' },
      { status: 400 }
    );
  }

  try {
    const result = await verifyEmailToken(token);

    if (!result.success) {
      // Redirect to error page
      return NextResponse.redirect(
        new URL(`/sign-in?error=invalid-token`, request.url)
      );
    }

    // Redirect to success page
    return NextResponse.redirect(
      new URL(`/sign-in?verified=true`, request.url)
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.redirect(
      new URL(`/sign-in?error=verification-failed`, request.url)
    );
  }
}