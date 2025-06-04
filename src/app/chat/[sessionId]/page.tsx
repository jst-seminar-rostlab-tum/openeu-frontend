import { Suspense } from 'react';

import ChatSkeleton from '@/components/Chat/ChatSkeleton';

import ChatSessionClient from './ChatSessionClient';

export default function ChatSessionPage({
  params,
}: {
  params: { sessionId: string };
}) {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatSessionClient sessionId={params.sessionId} />
    </Suspense>
  );
}
