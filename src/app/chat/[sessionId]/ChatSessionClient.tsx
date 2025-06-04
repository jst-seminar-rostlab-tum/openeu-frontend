'use client';

import { useChatContext } from '@/app/chat/ChatContext';
import ChatFooter from '@/components/Chat/ChatFooter';
import ChatInterface from '@/components/Chat/ChatInterface';

interface ChatSessionClientProps {
  sessionId: string;
}

export default function ChatSessionClient({
  sessionId,
}: ChatSessionClientProps) {
  const { messages, streamingMessage, sendMessage, currentSessionId } =
    useChatContext();

  // If the URL session doesn't match current context session, it means session doesn't exist
  if (currentSessionId !== sessionId) {
    throw new Error(`Session ${sessionId} not found`);
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1">
        <ChatInterface
          messages={messages}
          streamingMessage={streamingMessage}
        />
      </div>

      <ChatFooter onSendMessage={sendMessage} />
    </div>
  );
}
