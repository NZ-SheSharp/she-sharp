'use client';

import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  isStreaming?: boolean;
}

export function ChatMessage({ content, role, isStreaming }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex gap-3 px-4 py-3',
        role === 'user' ? 'bg-muted/50' : 'bg-background'
      )}
    >
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
        role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-purple-100 text-purple-700'
      )}>
        {role === 'user' ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-medium">
          {role === 'user' ? 'You' : 'She Sharp Assistant'}
        </p>
        <div className="prose prose-sm max-w-none text-foreground">
          {content}
          {isStreaming && (
            <span className="inline-block h-4 w-1 animate-pulse bg-primary ml-1" />
          )}
        </div>
      </div>
    </motion.div>
  );
}