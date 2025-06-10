'use client';

import { format, parseISO } from 'date-fns';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { InboxItem } from '@/domain/entities/inbox-item/inbox-item';

interface NewsletterDialogProps {
  item: InboxItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewsletterDialog({
  item,
  open,
  onOpenChange,
}: NewsletterDialogProps) {
  if (!item) return null;

  const formattedDate = format(parseISO(item.date), 'PPP');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-2xl !max-w-6xl h-fit max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{item.country}</span>
          </DialogDescription>
        </DialogHeader>
        {item.message ? (
          <div
            className="prose prose-sm max-w-none dark:prose-invert w-full overflow-y-auto flex-1 scrollbar-custom"
            dangerouslySetInnerHTML={{ __html: item.message }}
          />
        ) : (
          <p className="text-muted-foreground italic">No content available</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
