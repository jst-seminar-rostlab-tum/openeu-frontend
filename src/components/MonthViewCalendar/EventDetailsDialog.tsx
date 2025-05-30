'use client';

import { format, parseISO } from 'date-fns';
import { Calendar, Clock, Text, User } from 'lucide-react';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { formatTime } from '@/operations/meeting/CalendarHelpers';


interface IProps {
  event: MeetingData;
  children: ReactNode;
}

export function EventDetailsDialog({ event, children }: IProps) {
  const startDate = parseISO(event.meeting_start_datetime);
  const endDate = parseISO(event.meeting_end_datetime);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4 p-4">
                <div className="flex items-start gap-2">
              <User className="mt-1 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Topics</p>
                <p className="text-sm text-muted-foreground">
                  {event.tags?.length
                    ? event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block mr-1 px-2 py-0.5 m-2 bg-gray-500 text-white rounded"
                        >
                          {tag}
                        </span>
                      ))
                    : 'Unknown'}
                </p>
              </div>
            </div>

                <div className="flex items-start gap-2">
              <Calendar className="mt-1 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">
                            {format(startDate, 'EEEE dd MMMM')}
                            <span className="mx-1">at</span>
                            {formatTime(parseISO(event.meeting_start_datetime), true)}
                          </p>
              </div>
            </div>

                <div className="flex items-start gap-2">
              <Clock className="mt-1 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">End Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(endDate, 'EEEE dd MMMM')}
                  <span className="mx-1">at</span>
                  {formatTime(parseISO(event.meeting_end_datetime), true)}
                </p>
              </div>
            </div>

                <div className="flex items-start gap-2">
              <Text className="mt-1 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </div>
              </div>
        </ScrollArea>
        <DialogClose asChild>
          <Button variant="outline" className="mt-4 w-full">
            Close
                    </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}