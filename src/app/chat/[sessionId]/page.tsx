import { Suspense } from 'react';

import ChatSkeleton from '@/components/Chat/ChatSkeleton';

import ChatSessionClient from './ChatSessionClient';

export default async function ChatSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatSessionClient sessionId={sessionId} />
    </Suspense>
  );
}
