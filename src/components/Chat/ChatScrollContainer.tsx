'use client';

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useChatContext } from '@/app/chat/ChatContext';

interface ScrollToBottomContextType {
  showScrollButton: boolean;
  scrollToBottom: () => void;
}

const ScrollToBottomContext = createContext<ScrollToBottomContextType>({
  showScrollButton: false,
  scrollToBottom: () => {},
});

export function useScrollToBottomButton() {
  return useContext(ScrollToBottomContext);
}

interface ChatScrollContainerProps {
  children: React.ReactNode;
}

export default function ChatScrollContainer({
  children,
}: ChatScrollContainerProps) {
  const { messages } = useChatContext();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Set up scroll detection
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      setShowScrollButton(distanceFromBottom > 200);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <ScrollToBottomContext.Provider
      value={{ showScrollButton, scrollToBottom }}
    >
      <div
        ref={scrollContainerRef}
        className="flex-1 relative overflow-y-auto scrollbar-custom p-4 pb-0"
      >
        {children}
      </div>
    </ScrollToBottomContext.Provider>
  );
}
