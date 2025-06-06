import { Message } from '@/domain/entities/chat/generated-types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.author === 'user') {
    return (
      <div className="flex justify-end">
        <p className="bg-muted rounded-2xl p-2 px-4 max-w-[75%] whitespace-pre-wrap text-sm leading-relaxed break-words overflow-wrap-anywhere">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <p className="whitespace-pre-wrap text-sm leading-relaxed break-words overflow-wrap-anywhere">
      {message.content}
    </p>
  );
}
