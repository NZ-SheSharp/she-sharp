import { NextResponse } from 'next/server';
import { sendEmail, sendVerificationEmail } from '@/lib/email/service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, type = 'test' } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    let result;
    
    if (type === 'verification') {
      // Send a test verification email
      const testToken = 'test-token-' + Date.now();
      result = await sendVerificationEmail(email, testToken);
    } else {
      // Send a simple test email
      result = await sendEmail({
        to: email,
        subject: 'Test Email from She Sharp',
        html: `
          <h1>Test Email</h1>
          <p>This is a test email from She Sharp.</p>
          <p>If you received this, your email configuration is working correctly!</p>
          <p>Sent at: ${new Date().toISOString()}</p>
        `,
        text: `Test Email\n\nThis is a test email from She Sharp.\nIf you received this, your email configuration is working correctly!\nSent at: ${new Date().toISOString()}`,
      });
    }

    // Debug information
    const debugInfo = {
      emailServiceConfigured: !!process.env.RESEND_API_KEY,
      emailFrom: process.env.EMAIL_FROM || 'Not configured',
      baseUrl: process.env.BASE_URL || 'Not configured',
      nodeEnv: process.env.NODE_ENV,
    };

    return NextResponse.json({
      success: result,
      message: result ? 'Email sent successfully' : 'Failed to send email',
      debug: debugInfo,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send test email',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Email test endpoint',
    configured: !!process.env.RESEND_API_KEY,
    emailFrom: process.env.EMAIL_FROM || 'Not configured',
    baseUrl: process.env.BASE_URL || 'Not configured',
    nodeEnv: process.env.NODE_ENV,
  });
}