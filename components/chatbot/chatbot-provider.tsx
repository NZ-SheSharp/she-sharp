'use client';

import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('./chatbot').then(mod => ({ default: mod.Chatbot })), {
  ssr: false,
  loading: () => null
});

export function ChatbotProvider() {
  return <Chatbot />;
}