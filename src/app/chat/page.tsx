'use client';

import Image from 'next/image';
import { useState } from 'react';

import ChatInputCard from '@/app/chat/components/ChatInputCard';
import { ChatMessage } from '@/app/chat/components/ChatMessage';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [streamingMessage, setStreamingMessage] = useState('');

  // TODO: Replace with actual user ID from auth
  const userId = 'user-123';

  const createSession = async (title: string): Promise<string> => {
    // TODO: Replace with actual API call to POST /chat/start
    console.log('Creating session:', { userId, title });
    const mockSessionId = `session-${Date.now()}`;
    return mockSessionId;
  };

  const sendMessageToAPI = async (sessionId: string, message: string) => {
    // TODO: Replace with actual API call to POST /chat with streaming
    console.log('Sending message:', { sessionId, message });

    // Mock streaming response
    const mockResponse =
      "I'm OpenEU, your AI assistant for EU regulations and compliance. How can I help you understand upcoming EU laws, directives, or compliance requirements?";

    // Simulate streaming using array methods and Promise.all
    const words = mockResponse.split(' ');
    let accumulated = '';

    await Promise.all(
      words.map(
        (word, index) =>
          new Promise<void>((resolve) => {
            setTimeout(() => {
              accumulated += `${word} `;
              setStreamingMessage(accumulated);
              resolve();
            }, index * 100);
          }),
      ),
    );

    return accumulated.trim();
  };

  const handleAddFile = () => {
    console.log('Add file functionality - to be implemented');
  };

  const handleSettings = () => {
    console.log('Settings functionality - to be implemented');
  };

  const handleSendMessage = async (content: string) => {
    try {
      let sessionId = currentSessionId;
      if (!sessionId) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        sessionId = await createSession(title);
        setCurrentSessionId(sessionId);
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      setStreamingMessage('');
      const aiResponse = await sendMessageToAPI(sessionId, content);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setStreamingMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-6">
            <Image
              src="/project-europe-no-bg.png"
              alt="Project Europe"
              width={200}
              height={200}
              priority
              className="dark:invert"
            />
            <p className="max-w-xl text-center text-muted-foreground">
              OpenEU helps companies track and understand upcoming EU laws and
              national implementations. Ask anything about regulations,
              directives, or compliance, from sustainability reporting to AI
              governance.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10 w-full pb-8">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {/* Show streaming message */}
            {streamingMessage && (
              <p className="whitespace-pre-wrap text-sm leading-relaxed opacity-70">
                {streamingMessage}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="sticky bottom-0">
        <ChatInputCard
          onSendMessage={handleSendMessage}
          onAddFile={handleAddFile}
          onSettings={handleSettings}
        />
        <p className="text-xs text-muted-foreground text-center mt-2">
          OpenEU may occasionally provide incomplete or outdated information.
          Always verify critical details with official EU or national sources.
        </p>
      </div>
    </div>
  );
}
