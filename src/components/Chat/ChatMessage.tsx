interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.isUser) {
    return (
      <div className="flex justify-end">
        <p className="bg-muted rounded-2xl p-2 px-4 max-w-[75%] whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <p className="whitespace-pre-wrap text-sm leading-relaxed">
      {message.content}
    </p>
  );
}
