'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Bot, User, Send, Loader2, Sparkles } from 'lucide-react';
import { askAI } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function AIAssistantChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hello! I'm Siva's AI assistant. How can I help you today? I can help draft a message or answer questions about Siva.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };
  
  const suggestions = [
    "Draft an email to Siva about a job opportunity.",
    "What are Siva's top skills?",
    "Tell me about the AutoTuning.AI project."
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await askAI({
        message: input,
        history: messages,
      });
      const modelMessage: Message = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error asking AI:', error);
      const errorMessage: Message = {
        role: 'model',
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="glass-card flex flex-col h-[500px] w-full max-w-lg mx-auto overflow-hidden">
      <div className="p-4 border-b border-primary/10 flex items-center gap-2">
        <Sparkles className="text-primary" />
        <h3 className="font-headline text-lg">AI Assistant</h3>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'model' && (
                <div className="bg-secondary p-2 rounded-full">
                  <Bot className="w-5 h-5 text-secondary-foreground" />
                </div>
              )}
              <div
                className={cn(
                  'p-3 rounded-lg max-w-[80%]',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              {message.role === 'user' && (
                 <div className="bg-primary p-2 rounded-full">
                    <User className="w-5 h-5 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="bg-secondary p-2 rounded-full">
                <Bot className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
        
        {messages.length <= 1 && (
           <div className="mt-8 space-y-2">
            <p className="text-sm text-muted-foreground text-center">Or try a suggestion:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((s,i) => (
                <Button key={i} variant="outline" size="sm" onClick={() => handleSuggestion(s)}>
                  {s}
                </Button>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t border-primary/10 flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </form>
    </div>
  );
}
