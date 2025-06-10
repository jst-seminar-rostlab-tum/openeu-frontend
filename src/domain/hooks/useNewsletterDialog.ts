import { useCallback, useState } from 'react';

import { InboxItem } from '@/domain/entities/inbox-item/inbox-item';

export function useNewsletterDialog() {
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback((item: InboxItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    // Delay clearing selectedItem to allow for closing animation
    setTimeout(() => setSelectedItem(null), 150);
  }, []);

  return {
    selectedItem,
    isOpen,
    openDialog,
    closeDialog,
  };
}
