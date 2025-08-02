import { NextResponse } from 'next/server';

export async function GET() {
  // NextAuth will handle CSRF internally
  // Return a dummy token for now
  return NextResponse.json({ csrfToken: 'dummy' });
}