import ChatInputCard from './ChatInputCard';

export default function ChatFooter() {
  return (
    <div className="sticky bottom-0 bg-background rounded-t-xl">
      <ChatInputCard />
      <p className="text-xs text-muted-foreground text-center py-2">
        OpenEU may occasionally provide incomplete or outdated information.
        Always verify critical details with official EU or national sources.
      </p>
    </div>
  );
}
