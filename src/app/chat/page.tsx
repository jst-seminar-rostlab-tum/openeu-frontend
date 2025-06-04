'use client';

import Image from 'next/image';

import { useChatContext } from '@/app/chat/ChatContext';
import ChatFooter from '@/components/Chat/ChatFooter';
import { useAuth } from '@/domain/hooks/useAuth';

export default function Chat() {
  const { sendMessage } = useChatContext();
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1">
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
            Welcome{' '}
            {user?.user_metadata?.first_name ||
              user?.email?.split('@')[0] ||
              'there'}
            ! OpenEU helps companies track and understand upcoming EU laws and
            national implementations. Ask anything about regulations,
            directives, or compliance, from sustainability reporting to AI
            governance.
          </p>
        </div>
      </div>

      <ChatFooter onSendMessage={sendMessage} />
    </div>
  );
}
