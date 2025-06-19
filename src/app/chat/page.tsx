import ChatFooter from '@/components/Chat/ChatFooter';
import { getUser } from '@/lib/dal';
import { getFirstName } from '@/lib/utils';

export default async function Chat() {
  const user = await getUser();

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1">
        <div className="h-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            OpenEU
          </h1>
          <p className="max-w-xl text-center text-muted-foreground">
            Welcome {user ? getFirstName(user) : ''}! OpenEU helps companies
            track and understand upcoming EU laws and national implementations.
            Ask anything about regulations, directives, or compliance, from
            sustainability reporting to AI governance.
          </p>
        </div>
      </div>
      <ChatFooter />
    </div>
  );
}
