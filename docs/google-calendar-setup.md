# Google Calendar Setup Guide

This guide helps you configure Google Calendar for public access on your deployed website.

## Problem
When deploying to Vercel, you might see the error: "Events from one or more calendars could not be shown here because you do not have the permission to view them."

## Solution Options

### Option 1: Fix Calendar Permissions (Recommended First Step)

1. **Sign in to Google Calendar** with the account that owns the calendar (website@shesharp.org.nz)

2. **Navigate to Calendar Settings:**
   - Click the gear icon → Settings
   - Select your calendar from the left sidebar

3. **Update Access Permissions:**
   - Find "Access permissions for events"
   - ✅ Check "Make available to public"
   - ✅ Select "See all event details" (NOT "See only free/busy")
   - Save changes

4. **Check Organization Settings:**
   - If using Google Workspace, your admin may need to:
     - Allow external calendar sharing
     - Remove domain restrictions
     - Enable public calendar access

5. **Wait for Changes:**
   - Changes may take up to 24 hours to propagate
   - Clear browser cache and test again

### Option 2: Use Google Calendar API (More Reliable)

1. **Create a Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable the Google Calendar API

2. **Create API Credentials:**
   - Go to APIs & Services → Credentials
   - Click "Create Credentials" → API Key
   - Restrict the key:
     - Application restrictions: HTTP referrers
     - Add your domains:
       - `https://yourdomain.vercel.app/*`
       - `https://yourdomain.com/*`
       - `http://localhost:3000/*` (for development)
     - API restrictions: Google Calendar API only

3. **Add API Key to Vercel:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY` = your-api-key
   - Redeploy your application

### Option 3: Alternative Embed Method

If the above options don't work, try this direct URL format:

```javascript
// In google-calendar-embed.tsx
const publicUrl = `https://calendar.google.com/calendar/u/0/embed?src=${encodeURIComponent(calendarId)}&ctz=Pacific/Auckland`;
```

### Troubleshooting

1. **Test the Public URL:**
   - Open in incognito/private browser: https://calendar.google.com/calendar/embed?src=be0a13dc6a2867f7da1144d4370ef222ce6aaf3b15b062fa35e79f60c8ed22ba%40group.calendar.google.com
   - If it doesn't work, the calendar isn't properly public

2. **Check Console Errors:**
   - Open browser developer tools
   - Look for CORS or permission errors

3. **Verify Domain Settings:**
   - Ensure your Vercel domain is properly configured
   - Check if there are any CSP (Content Security Policy) issues

4. **Contact Google Workspace Admin:**
   - They may need to update organization-wide sharing settings
   - Request to allow public calendar sharing for website@shesharp.org.nz

## Testing

After making changes:
1. Clear browser cache
2. Test in incognito mode
3. Check both development and production environments
4. Verify on different devices/networks

## Support

If issues persist:
- Check Google Calendar Help: https://support.google.com/calendar
- Review Google Workspace admin settings
- Consider using a third-party calendar service as backup