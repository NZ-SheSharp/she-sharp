import { signIn } from '@/lib/auth/auth.config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { provider, callbackUrl } = await req.json();
    
    // Generate the OAuth authorization URL
    const url = new URL(`/api/auth/signin/${provider}`, req.url);
    url.searchParams.set('callbackUrl', callbackUrl || '/dashboard');
    
    return NextResponse.json({ url: url.toString() });
  } catch (error) {
    console.error('OAuth signin error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate OAuth signin' },
      { status: 500 }
    );
  }
}