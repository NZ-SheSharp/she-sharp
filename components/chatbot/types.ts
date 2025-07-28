export interface PresetQuestion {
  id: string;
  question: string;
  answer: string;
  category: 'about' | 'events' | 'mentorship' | 'support' | 'general';
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isPreset?: boolean;
}