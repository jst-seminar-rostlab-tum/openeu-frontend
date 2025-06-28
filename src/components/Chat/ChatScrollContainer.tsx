'use client';

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface ScrollToBottomContextType {
  showScrollButton: boolean;
  scrollToBottom: () => void;
  scrollToBottomAfterRender: () => void;
}

const ScrollToBottomContext = createContext<ScrollToBottomContextType>({
  showScrollButton: false,
  scrollToBottom: () => {},
  scrollToBottomAfterRender: () => {},
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollToBottomAfterRender = useCallback(() => {
    if (scrollContainerRef.current) {
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop =
            scrollContainerRef.current.scrollHeight;
        }
      });
    }
  }, []);

  return (
    <ScrollToBottomContext.Provider
      value={{ showScrollButton, scrollToBottom, scrollToBottomAfterRender }}
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
