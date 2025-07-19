'use client';

import { format, isSameDay, isSameWeek, parseISO, startOfDay } from 'date-fns';
import { Building, Calendar, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

import { AvatarStack } from '@/components/calendar/AvatarStack';
import { EventBullet } from '@/components/calendar/MonthViewCalendar/EventBullet';
import { EventDetailsDialog } from '@/components/calendar/MonthViewCalendar/EventDetailsDialog';
import { RelevanceScore } from '@/components/RelevanceScore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { cn, COLOR_SCHEMES } from '@/lib/utils';
import { getMeetingTypeShort } from '@/operations/meeting/CalendarHelpers';

interface EventListDialogProps {
  date: Date;
  events: Meeting[];
  MAX_VISIBLE_EVENTS?: number;
  children?: ReactNode;
  endDate?: Date;
  title?: string;
  open?: boolean;
  selectedCountry?: string;
  isInCalendar?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EventListDialog({
  date,
  events,
  MAX_VISIBLE_EVENTS = 3,
  children,
  endDate,
  title,
  open,
  selectedCountry,
  isInCalendar = true,
  onOpenChange,
}: EventListDialogProps) {
  const cellEvents = events;
  const hiddenEventsCount = Math.max(cellEvents.length - MAX_VISIBLE_EVENTS, 0);
  const { filters } = useMeetingContext();
  const router = useRouter();

  const defaultTrigger = (
    <span className="cursor-pointer">
      <span className="sm:hidden">+{hiddenEventsCount}</span>
      <span className="hidden sm:inline py-0.5 px-2 my-1 rounded-xl border">
        {hiddenEventsCount}
        <span className="mx-1">more...</span>
      </span>
    </span>
  );

  const determineViewType = (
    startDate: Date,
    endDate?: Date,
  ): 'day' | 'week' | 'month' => {
    if (!endDate) return 'day';
    const normalizedStart = startOfDay(startDate);
    const normalizedEnd = startOfDay(endDate);

    if (isSameDay(normalizedStart, normalizedEnd)) {
      return 'day';
    }

    if (isSameWeek(normalizedStart, normalizedEnd, { weekStartsOn: 1 })) {
      return 'week';
    }

    return 'month';
  };

  const handleGoToCalendar = () => {
    if (!filters.start) return;

    try {
      const startDate = parseISO(filters.start);
      const endDate = filters.end ? parseISO(filters.end) : undefined;
      const country = selectedCountry || '';

      const view = determineViewType(startDate, endDate);

      const params = new URLSearchParams({
        start: filters.start,
        ...(filters.end && { end: filters.end }),
        ...(country && { country }),
        view,
      });

      router.push(`/calendar?${params}`);
    } catch {
      router.push(`/calendar?start=${filters.start}`);
    }
  };

  function eventListEntry(event: Meeting, index: number) {
    const relevanceScore = event.similarity
      ? Math.round(event.similarity * 100)
      : null;
    return (
      <EventDetailsDialog key={`${event.meeting_id}-${index}`} event={event}>
        <div
          className={cn(
            'flex items-center gap-2 p-2 border rounded-md cursor-pointer',
            COLOR_SCHEMES[event.color].bg,
            COLOR_SCHEMES[event.color].text,
            COLOR_SCHEMES[event.color].outline,
          )}
        >
          <div className="flex w-full flex-col gap-2">
            <div className="flex justify-between gap-1">
              <p className="flex flex-col text-sm font-medium">{event.title}</p>
              {relevanceScore && (
                <RelevanceScore meeting={event} type={'circle'} />
              )}
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="subtle" className="text-foreground">
                <Building className="shrink-0" />
                {getMeetingTypeShort(event.source_table)}
              </Badge>
              <Badge variant="subtle" className="text-foreground max-w-40">
                <MapPin className="shrink-0 w-3 h-3" />
                <span
                  className="truncate min-w-0 direction-rtl text-left"
                  title={getMeetingTypeShort(
                    event.location ? event.location : 'No location specified',
                  )}
                >
                  {event.location && getMeetingTypeShort(event.location)}
                </span>
              </Badge>
              {(event.member || event.attendees) && (
                <AvatarStack
                  member={event.member}
                  attendees={event.attendees}
                ></AvatarStack>
              )}
            </div>
          </div>
        </div>
      </EventDetailsDialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children || defaultTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <EventBullet color={cellEvents[0]?.color} className="" />
              <p className="text-sm font-medium">
                {title ||
                  (endDate
                    ? `Events during ${format(date, 'HH:mm')} - ${format(endDate, 'HH:mm')}`
                    : `Events on ${format(date, 'EEEE, MMMM d, yyyy')}`)}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto space-y-2 scrollbar-custom">
          {cellEvents.map((event, index) => eventListEntry(event, index))}
        </div>
        {!isInCalendar && (
          <DialogFooter>
            <Button variant="default" onClick={handleGoToCalendar}>
              <Calendar className="h-5 w-5 pointer-events-none" />
              Show in Calendar
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
