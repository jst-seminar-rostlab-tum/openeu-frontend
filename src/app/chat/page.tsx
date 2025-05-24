import ChatSidebar from '@/app/chat/components/ChatSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function Chat() {
  return (
    <SidebarProvider>
      <ChatSidebar variant="inset" />
      <SidebarInset>
        <header className="flex items-center h-16 shrink-0 gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <h1>Chat</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
