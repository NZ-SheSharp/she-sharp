'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, X, Minimize2, Send, Maximize2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChatMessage } from './chat-message';
import { TypingIndicator } from './typing-indicator';
import { QuickActions } from './quick-actions';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const STORAGE_KEY = 'she-sharp-chat-history';
const MAX_HISTORY_SIZE = 50;

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Load chat history from localStorage
  const loadChatHistory = useCallback(() => {
    if (typeof window === 'undefined') return [];
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.slice(-MAX_HISTORY_SIZE); // Keep only last 50 messages
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
    
    return [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hello! I\'m the She Sharp assistant. I\'m here to help you learn about our organization, programs, and how you can get involved. How can I help you today?'
      }
    ];
  }, []);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, setInput, error } = useChat({
    api: '/api/chat',
    initialMessages: loadChatHistory(),
    onError: (error) => {
      console.error('[Chatbot] Error occurred:', error);
      console.error('[Chatbot] Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    },
    onResponse: (response) => {
      console.log('[Chatbot] Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
    },
    onFinish: (message) => {
      console.log('[Chatbot] Message finished:', message);
    }
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0 && typeof window !== 'undefined') {
      try {
        const toSave = messages.slice(-MAX_HISTORY_SIZE);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      } catch (error) {
        console.error('Failed to save chat history:', error);
      }
    }
  }, [messages]);

  // Keyboard shortcut to open/close chat
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  // Focus textarea when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Track new messages when minimized
  useEffect(() => {
    if (isMinimized && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setHasNewMessage(true);
      }
    }
  }, [messages, isMinimized]);

  const handlePresetQuestion = (question: string, answer: string) => {
    setMessages([
      ...messages,
      { id: Date.now().toString(), role: 'user', content: question },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: answer }
    ]);
  };

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Chatbot] Form submitted with input:', input);
    console.log('[Chatbot] Current messages:', messages);
    console.log('[Chatbot] Is loading:', isLoading);
    handleSubmit(e);
  }, [input, messages, isLoading, handleSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('[Chatbot] Enter key pressed, submitting form');
      handleFormSubmit(e as any);
    }
  };

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
    setHasNewMessage(false);
  }, []);

  const clearHistory = useCallback(() => {
    const initialMessages = [
      {
        id: 'welcome',
        role: 'assistant' as const,
        content: 'Hello! I\'m the She Sharp assistant. I\'m here to help you learn about our organization, programs, and how you can get involved. How can I help you today?'
      }
    ];
    setMessages(initialMessages);
    localStorage.removeItem(STORAGE_KEY);
  }, [setMessages]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            className={cn(
              'fixed z-50',
              // When minimized, only position bottom-right
              isMinimized ? [
                'bottom-20 right-4 w-96 max-w-[calc(100vw-2rem)]'
              ] : [
                // Mobile layout (default) - fullscreen with margins
                'top-4 right-4 bottom-4 left-4',
                // Desktop layout (sm and up) - positioned dialog
                'sm:top-auto sm:left-auto',
                'sm:bottom-4 sm:right-4',
                'sm:w-[28rem] sm:max-w-[calc(100vw-2rem)]',
                'sm:h-[40rem] sm:max-h-[calc(100vh-5rem)]'
              ],
              isMinimized && 'pointer-events-none'
            )}
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            <Card className={cn(
              'flex flex-col overflow-hidden shadow-2xl border-purple-200 h-full',
              isMinimized && 'h-14'
            )}>
              <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 p-3 sm:p-4 text-white flex-shrink-0">
                <div className="flex items-center gap-2">
                  <MessageSquare size={20} />
                  <h3 className="font-semibold">She Sharp Assistant</h3>
                  {hasNewMessage && (
                    <Badge variant="secondary" className="bg-white text-purple-700 text-xs">
                      New
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs opacity-70 mr-2">⌘K</span>
                  {!isMinimized && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={clearHistory}
                      title="Clear chat history"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={toggleMinimize}
                  >
                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <div className="flex flex-col flex-1 overflow-hidden">
                  <ScrollArea ref={scrollAreaRef} className="flex-1 overflow-auto">
                    <div className="flex flex-col">
                      {messages
                        .filter((message) => message.id !== 'system')
                        .map((message) => (
                          <ChatMessage
                            key={message.id}
                            content={message.content}
                            role={message.role as 'user' | 'assistant'}
                            isStreaming={false}
                          />
                        ))}
                      {isLoading && <TypingIndicator />}
                    </div>
                  </ScrollArea>

                  {error && (
                    <Alert variant="destructive" className="mx-4 my-2 flex-shrink-0">
                      <AlertDescription>
                        Error: {error.message || 'Failed to send message. Please check the console for details.'}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex-shrink-0">
                    <QuickActions onSelectQuestion={handlePresetQuestion} />
                  </div>

                  <form onSubmit={handleFormSubmit} className="border-t p-4 flex-shrink-0">
                    <div className="flex gap-2">
                      <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message... (Shift+Enter for new line)"
                        className="min-h-[80px] max-h-[150px] resize-none"
                        disabled={isLoading}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !input.trim()}
                        className="bg-purple-600 hover:bg-purple-700 flex-shrink-0 h-[80px]"
                      >
                        <Send size={20} />
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </Card>
          </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'fixed bottom-4 right-4 sm:bottom-4 sm:right-4 z-50',
          isOpen && 'hidden'
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageSquare size={24} />
          {hasNewMessage && !isOpen && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          )}
        </button>
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-md p-2 text-xs text-gray-600 opacity-0 hover:opacity-100 transition-opacity">
          Press ⌘K to open
        </div>
      </motion.div>
    </>
  );
}