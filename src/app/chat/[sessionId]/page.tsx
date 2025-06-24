import ChatFooter from '@/components/Chat/ChatFooter';
import ChatInterface from '@/components/Chat/ChatInterface';

export default function ChatSessionPage() {
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1">
        <ChatInterface />
      </div>
      <ChatFooter />
    </div>
  );
}
