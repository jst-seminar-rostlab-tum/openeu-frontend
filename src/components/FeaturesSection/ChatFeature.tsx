'use client';

import { motion } from 'framer-motion';
import { Bot, MessageSquare, Send, User } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import FeaturesOperations, {
  type ChatMessage,
} from '@/operations/features/FeaturesOperations';

export default function ChatFeature() {
  const [messages, setMessages] = useState<ChatMessage[]>(
    FeaturesOperations.getChatMessages(),
  );
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = FeaturesOperations.createChatMessage(
      messages.length + 1,
      inputValue,
      true,
    );

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = FeaturesOperations.createChatMessage(
        messages.length + 2,
        FeaturesOperations.generateMockAIResponse(),
        false,
      );
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full border-2 border-black dark:border-white bg-white dark:bg-gray-900">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-8 h-8 text-white dark:text-black" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl text-black dark:text-white">
              AI Legal Assistant
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Get instant answers about EU regulations and compliance
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 flex flex-col h-[400px]">
        {/* Chat Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto mb-4 scrollbar-custom">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isUser
                    ? 'bg-gray-300 dark:bg-gray-600'
                    : 'bg-black dark:bg-white'
                }`}
              >
                {message.isUser ? (
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Bot className="w-4 h-4 text-white dark:text-black" />
                )}
              </div>
              <div
                className={`max-w-[80%] ${message.isUser ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-black dark:bg-white text-white dark:text-black rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {message.timestamp}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about EU regulations..."
            className="flex-1 border-black dark:border-white focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
