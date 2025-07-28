'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { presetQuestions } from './preset-questions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickActionsProps {
  onSelectQuestion: (question: string, answer: string) => void;
}

const categoryColors = {
  about: 'bg-blue-100 text-blue-700',
  events: 'bg-green-100 text-green-700',
  mentorship: 'bg-purple-100 text-purple-700',
  support: 'bg-orange-100 text-orange-700',
  general: 'bg-gray-100 text-gray-700'
};

export function QuickActions({ onSelectQuestion }: QuickActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-t bg-muted/30">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <HelpCircle size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Quick Questions</span>
        </div>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ScrollArea className="h-40 px-3 pb-3">
              <div className="space-y-2">
                {presetQuestions.map((preset) => (
                  <Button
                    key={preset.id}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => {
                      onSelectQuestion(preset.question, preset.answer);
                      setIsExpanded(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={cn('text-xs flex-shrink-0', categoryColors[preset.category])}
                      >
                        {preset.category}
                      </Badge>
                      <span className="text-sm line-clamp-1">{preset.question}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}