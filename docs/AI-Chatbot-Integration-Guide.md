# AI Chatbot Integration Guide for She Sharp Website

## Overview

This document provides a comprehensive guide on how the AI chatbot was integrated into the She Sharp website. It covers the technical implementation, challenges encountered, and solutions applied during the development process.

## Table of Contents

1. [Project Context](#project-context)
2. [Technology Stack](#technology-stack)
3. [Implementation Steps](#implementation-steps)
4. [Key Features](#key-features)
5. [Challenges and Solutions](#challenges-and-solutions)
6. [Streaming Response Implementation](#streaming-response-implementation)
7. [Environment Configuration](#environment-configuration)
8. [Deployment Considerations](#deployment-considerations)
9. [Best Practices and Lessons Learned](#best-practices-and-lessons-learned)

## Project Context

She Sharp is a non-profit organization dedicated to bridging the gender gap in STEM fields. The AI chatbot was integrated to provide instant assistance to website visitors, answering questions about:
- Organization programs and services
- Mentorship opportunities
- Events and workshops
- How to get involved

## Technology Stack

### Core Technologies
- **Framework**: Next.js 15.4.0 with App Router
- **Language**: TypeScript
- **AI SDK**: Vercel AI SDK v4.3.19
- **AI Provider**: Google Gemini Pro (via @ai-sdk/google v1.2.22)
- **Additional SDK**: @google/generative-ai v0.24.1
- **UI Animation**: Framer Motion v12.23.9
- **UI Components**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS v4

### Key Dependencies
```json
{
  "@ai-sdk/google": "^1.2.22",
  "@google/generative-ai": "^0.24.1",
  "ai": "^4.3.19",
  "framer-motion": "^12.23.9"
}
```

## Implementation Steps

### 1. Initial Setup

First, install the required dependencies:
```bash
pnpm add ai @ai-sdk/google framer-motion
```

### 2. Component Structure

The chatbot implementation consists of several modular components:

```
components/chatbot/
├── chatbot.tsx              # Main chatbot component
├── chat-message.tsx         # Individual message component
├── typing-indicator.tsx     # Animated typing indicator
├── quick-actions.tsx        # Preset questions panel
├── preset-questions.ts      # Preset Q&A data
├── types.ts                # TypeScript interfaces
└── chatbot-provider.tsx    # Client-side wrapper
```

### 3. API Route Implementation

Create the chat API endpoint at `app/api/chat/route.ts`:

```typescript
import { google } from '@ai-sdk/google';
import { convertToCoreMessages, streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  // Clean messages and filter system messages
  const cleanedMessages = messages
    .filter((msg: any) => msg.id !== 'system')
    .map((msg: any) => ({
      role: msg.role,
      content: msg.content
    }));
  
  const model = google('gemini-1.5-flash');
  
  const result = await streamText({
    model,
    system: 'You are a helpful assistant for She Sharp...',
    messages: convertToCoreMessages(cleanedMessages),
    temperature: 0.7,
    maxTokens: 500,
  });
  
  return result.toDataStreamResponse();
}
```

### 4. Integration into Layout

Add the chatbot to the root layout (`app/layout.tsx`):

```typescript
import { ChatbotProvider } from '@/components/chatbot/chatbot-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ChatbotProvider />
      </body>
    </html>
  );
}
```

## Key Features

### 1. Streaming Responses
- Real-time AI responses with character-by-character display
- Visual typing indicator during response generation

### 2. Preset Questions System
- 8 pre-configured common questions
- Categorized by topic (About, Events, Mentorship, Support, General)
- Instant responses without API calls

### 3. Chat History Persistence
- LocalStorage implementation
- Stores up to 50 messages
- Survives page refreshes

### 4. User Experience Features
- Keyboard shortcuts (⌘K to open/close)
- Auto-focus on input field
- Smooth animations with Framer Motion
- Responsive design for mobile and desktop
- Clear chat history functionality

## Challenges and Solutions

### Challenge 1: TypeScript Type Errors

**Error**: 
```
Type error: Type '"user" | "data" | "system" | "assistant"' is not assignable to type '"user" | "assistant"'
```

**Solution**: Add type assertion when passing role prop:
```typescript
role={message.role as 'user' | 'assistant'}
```

### Challenge 2: Missing Tailwind CSS Classes

**Error**:
```
[Error: Cannot apply unknown utility class: md:text-3xl]
```

**Solution**: Define responsive text utilities in `globals.css`:
```css
@media (min-width: 768px) {
  .md\:text-3xl { font-size: var(--font-size-3xl); }
  .md\:text-4xl { font-size: var(--font-size-4xl); }
  /* ... other sizes */
}
```

### Challenge 3: Environment Variable Issues

**Problem**: API key not being recognized by the SDK

**Solution**: 
1. Ensure correct environment variable name: `GOOGLE_GENERATIVE_AI_API_KEY`
2. Add to `.env.local` (not `.env`)
3. Restart the development server after changes

## Streaming Response Implementation

### Initial Problem

The initial implementation using `GoogleGenerativeAIStream` and `StreamingTextResponse` failed with import errors:

```
Export GoogleGenerativeAIStream doesn't exist in target module
Export StreamingTextResponse doesn't exist in target module
```

### Investigation Process

1. **First Attempt**: Direct Google Generative AI SDK integration
   - Created custom streaming implementation
   - Encountered format compatibility issues with Vercel AI SDK

2. **Second Attempt**: Simple test API
   - Created `/api/chat-simple` endpoint to verify frontend functionality
   - Confirmed frontend could handle streaming responses correctly

3. **Final Solution**: Correct Vercel AI SDK Usage

The key was using the correct imports and methods from Vercel AI SDK v4:

```typescript
import { google } from '@ai-sdk/google';
import { convertToCoreMessages, streamText } from 'ai';

// Create model instance
const model = google('gemini-1.5-flash');

// Use streamText with proper configuration
const result = await streamText({
  model,
  system: systemPrompt,
  messages: convertToCoreMessages(cleanedMessages),
  temperature: 0.7,
  maxTokens: 500,
});

// Return the stream response
return result.toDataStreamResponse();
```

### Critical Fixes for Streaming

1. **Import Corrections**: Used `streamText` instead of non-existent `GoogleGenerativeAIStream`
2. **Message Format**: Used `convertToCoreMessages()` to ensure proper message format
3. **Response Method**: Used `result.toDataStreamResponse()` for proper streaming format
4. **Error Scope**: Fixed variable scope issue where `result` was defined inside try block but used outside

## Environment Configuration

### Required Environment Variables

Add to `.env.local`:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### Important Notes:
- Use `.env.local` for Next.js projects (not `.env`)
- The SDK automatically reads `GOOGLE_GENERATIVE_AI_API_KEY`
- Never commit API keys to version control

## Deployment Considerations

### Vercel Deployment

1. **Environment Variables**: Add `GOOGLE_GENERATIVE_AI_API_KEY` in Vercel project settings
2. **Build Errors**: Ensure all TypeScript errors are resolved
3. **Tailwind CSS**: Verify all utility classes are properly defined

### Performance Optimization

1. **Dynamic Import**: Chatbot is lazy-loaded to improve initial page load
   ```typescript
   const Chatbot = dynamic(() => import('./chatbot').then(mod => ({ default: mod.Chatbot })), {
     ssr: false,
     loading: () => null
   });
   ```

2. **Message Limits**: Store only last 50 messages to prevent localStorage bloat

## Best Practices and Lessons Learned

### 1. API Integration
- Always verify API key configuration before debugging other issues
- Use proper error handling and logging for debugging
- Test with simple implementations first to isolate problems

### 2. Streaming Responses
- Understand the specific requirements of your AI SDK version
- Verify import statements match the actual SDK exports
- Use browser developer tools to monitor network requests

### 3. Type Safety
- Define clear TypeScript interfaces for all data structures
- Use type assertions sparingly and only when necessary
- Leverage TypeScript's type inference where possible

### 4. User Experience
- Provide visual feedback during AI response generation
- Include preset questions for common queries
- Implement keyboard shortcuts for power users
- Ensure responsive design works on all devices

### 5. Error Handling
- Display user-friendly error messages
- Log detailed errors for debugging
- Implement retry mechanisms for transient failures

## Conclusion

The AI chatbot integration demonstrates the power of modern web technologies in creating interactive user experiences. By leveraging Vercel AI SDK with Google's Gemini model, we created a responsive, intelligent assistant that enhances the She Sharp website's ability to serve its community.

Key takeaways:
- Proper SDK usage and understanding documentation is crucial
- Iterative debugging and testing helps identify root causes
- Modular component design improves maintainability
- User experience should be the primary focus

For questions or improvements, refer to the codebase or contact the development team.