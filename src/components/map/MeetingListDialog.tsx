import { format, parseISO } from 'date-fns';
import { Building, Calendar, MapPin } from 'lucide-react';
import React, { useMemo } from 'react';

import { EventDetailsDialog } from '@/components/calendar/MonthViewCalendar/EventDetailsDialog';
import { RelevanceScore } from '@/components/RelevanceScore/RelevanceScore';
import { Badge } from '@/components/ui/badge';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { getMeetingTypeShort } from '@/operations/meeting/CalendarHelpers';

interface MeetingListDialogProps {
  countryName: string;
  meetings: MeetingData[];
}

export function MeetingListDialog({
  countryName,
  meetings,
}: MeetingListDialogProps) {
  const countryMeetings = useMemo(() => {
    const filtered = meetings.filter(
      (meeting) =>
        meeting.location === countryName ||
        (meeting.location === 'European Union' && countryName === 'Belgium'),
    );

    return filtered.sort((a, b) => {
      const dateA = parseISO(a.meeting_start_datetime);
      const dateB = parseISO(b.meeting_start_datetime);
      return dateA.getTime() - dateB.getTime();
    });
  }, [meetings, countryName]);

  if (countryMeetings.length === 0) {
    return null;
  }

  function meetingListEntry(meeting: MeetingData, index: number) {
    const startDate = parseISO(meeting.meeting_start_datetime);
    const relevanceScore = meeting.similarity
      ? Math.round(meeting.similarity * 100)
      : null;

    return (
      <EventDetailsDialog
        key={`${meeting.meeting_id}-${index}`}
        event={meeting}
      >
        <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors">
          <div className="flex w-full flex-col gap-2">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold line-clamp-2 mb-1">
                  {meeting.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="size-3" />
                  <span>
                    {format(startDate, 'MMM d, yyyy')} at{' '}
                    {format(startDate, 'HH:mm')}
                  </span>
                </div>
              </div>
              {relevanceScore && (
                <div className="flex-shrink-0">
                  <RelevanceScore meeting={meeting} type="circle" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                <Building className="size-3 mr-1" />
                {getMeetingTypeShort(meeting.source_table)}
              </Badge>
              <Badge variant="outline" className="text-xs max-w-32">
                <MapPin className="size-3 mr-1" />
                <span className="truncate">{meeting.location}</span>
              </Badge>
            </div>
          </div>
        </div>
      </EventDetailsDialog>
    );
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <MapPin className="size-5" />
          <span>Meetings in {countryName}</span>
          <Badge variant="secondary">{countryMeetings.length} events</Badge>
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[70vh]">
        <div className="space-y-3 pr-4">
          {countryMeetings.map((meeting, index) =>
            meetingListEntry(meeting, index),
          )}
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
