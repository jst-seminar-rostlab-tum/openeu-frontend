import ChatSidebar from '@/app/chat/components/ChatSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="min-h-[calc(100vh-3rem)]">
      <ChatSidebar variant="inset" className="mt-10" />
      <SidebarInset className="p-4 gap-2">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
