import { Resend } from 'resend';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Initialize Resend client if API key is provided
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Send email using Resend or log to console in development
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to, subject, html, text } = options;

  // Development mode - log email to console and save to file
  if (process.env.NODE_ENV === 'development' && !resend) {
    console.log('\n=====================================');
    console.log('📧 EMAIL PREVIEW (Development Mode)');
    console.log('=====================================');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('From: She Sharp <noreply@shesharp.org>');
    console.log('Time:', new Date().toISOString());
    console.log('-------------------------------------');
    
    // Extract important links from HTML
    const linkRegex = /href="([^"]*token=[^"]*)"/g;
    const matches = html.match(linkRegex);
    if (matches) {
      console.log('🔗 IMPORTANT LINKS:');
      matches.forEach(match => {
        const url = match.replace('href="', '').replace('"', '');
        console.log(`   ${url}`);
      });
      console.log('-------------------------------------');
    }
    
    console.log('EMAIL CONTENT:');
    console.log(text || 'See HTML version below');
    console.log('=====================================\n');

    // Save to a temporary file for easier access
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      const path = await import('path');
      const emailDir = path.join(process.cwd(), 'tmp', 'emails');
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(emailDir)) {
        fs.mkdirSync(emailDir, { recursive: true });
      }
      
      // Save email as HTML file
      const filename = `${Date.now()}-${to.replace('@', '_at_')}.html`;
      const filepath = path.join(emailDir, filename);
      fs.writeFileSync(filepath, html);
      
      console.log(`📁 Email saved to: tmp/emails/${filename}`);
      console.log(`🌐 Open in browser: file://${filepath}\n`);
    }

    return true;
  }

  // Production mode - use Resend
  if (resend) {
    try {
      console.log('Attempting to send email via Resend...');
      console.log('To:', to);
      console.log('From:', process.env.EMAIL_FROM || 'She Sharp <noreply@shesharp.org>');
      
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'She Sharp <noreply@shesharp.org>',
        to,
        subject,
        html,
        text,
      });

      if (error) {
        console.error('Resend error:', error);
        return false;
      }

      console.log('Email sent successfully via Resend!');
      console.log('Email ID:', data?.id);
      console.log('Response:', data);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Fallback to console in case of error
      if (process.env.NODE_ENV === 'development') {
        console.log('\n⚠️ Resend failed, showing email in console:');
        console.log('To:', to);
        console.log('Subject:', subject);
        const linkRegex = /href="([^"]*token=[^"]*)"/g;
        const matches = html.match(linkRegex);
        if (matches) {
          console.log('Links:', matches.map(m => m.replace('href="', '').replace('"', '')));
        }
      }
      
      return false;
    }
  }

  // No email service configured
  console.warn('⚠️ No email service configured. Set RESEND_API_KEY in .env');
  console.log('Email would be sent to:', to);
  console.log('Subject:', subject);
  
  return true;
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(email: string, token: string) {
  // Use localhost in development mode when BASE_URL is production
  const baseUrl = process.env.NODE_ENV === 'development' && process.env.BASE_URL?.includes('vercel.app') 
    ? 'http://localhost:3000' 
    : (process.env.BASE_URL || 'http://localhost:3000');
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verify Your Email - She Sharp</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #9b2e83 0%, #5a1968 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
        .button { display: inline-block; padding: 12px 30px; background: #9b2e83; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .link-box { background: #f0f0f0; padding: 10px; border-radius: 5px; word-break: break-all; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to She Sharp!</h1>
        </div>
        <div class="content">
          <h2>Verify Your Email Address</h2>
          <p>Thank you for joining She Sharp! Please verify your email address to complete your registration.</p>
          <p>Click the button below to verify your email:</p>
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button" style="color: white;">Verify Email</a>
          </div>
          <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <div class="link-box">
            <code style="font-size: 12px;">${verificationUrl}</code>
          </div>
          <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
        </div>
        <div class="footer">
          <p>© 2025 She Sharp. Empowering women in STEM.</p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Welcome to She Sharp!

Please verify your email address to complete your registration.

Click this link to verify your email:
${verificationUrl}

This link will expire in 24 hours.

If you didn't create an account, please ignore this email.

© 2025 She Sharp. Empowering women in STEM.
  `;

  return sendEmail({
    to: email,
    subject: 'Verify Your Email - She Sharp',
    html,
    text,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Reset Your Password - She Sharp</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #9b2e83 0%, #5a1968 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
        .button { display: inline-block; padding: 12px 30px; background: #9b2e83; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .warning { background: #fff3cd; border: 1px solid #ffc107; color: #856404; padding: 10px; border-radius: 5px; margin: 20px 0; }
        .link-box { background: #f0f0f0; padding: 10px; border-radius: 5px; word-break: break-all; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password for your She Sharp account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button" style="color: white;">Reset Password</a>
          </div>
          <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <div class="link-box">
            <code style="font-size: 12px;">${resetUrl}</code>
          </div>
          <div class="warning">
            <strong>Security Notice:</strong> This link will expire in 1 hour. If you didn't request this password reset, please ignore this email and your password will remain unchanged.
          </div>
        </div>
        <div class="footer">
          <p>© 2025 She Sharp. Empowering women in STEM.</p>
          <p>For security reasons, this link will expire in 1 hour.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Password Reset Request

We received a request to reset your password for your She Sharp account.

Click this link to reset your password:
${resetUrl}

This link will expire in 1 hour.

If you didn't request this password reset, please ignore this email and your password will remain unchanged.

© 2025 She Sharp. Empowering women in STEM.
  `;

  return sendEmail({
    to: email,
    subject: 'Reset Your Password - She Sharp',
    html,
    text,
  });
}