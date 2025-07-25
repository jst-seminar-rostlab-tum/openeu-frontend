'use client';

import { format, parseISO } from 'date-fns';
import {
  Building,
  Calendar,
  CalendarCheck2,
  CalendarOff,
  CalendarPlus,
  ExternalLink,
  MapPin,
  Scale,
  Tag,
  Text,
  User,
} from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

import { AvatarStack } from '@/components/calendar/AvatarStack';
import { TagBadge } from '@/components/calendar/TagBadge';
import { RelevanceScore } from '@/components/RelevanceScore';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinner';
import { getEvents, saveToCalendar } from '@/domain/actions/google-calendar';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { createClient } from '@/lib/supabase/client';
import { b64EncodeUnicode } from '@/lib/utils';
import {
  formatTime,
  getMeetingType,
} from '@/operations/meeting/CalendarHelpers';
import { ToastOperations } from '@/operations/toast/toastOperations';

interface IProps {
  event: Meeting;
  children: ReactNode;
}

export function EventDetailsDialog({ event, children }: IProps) {
  const startDate = parseISO(event.meeting_start_datetime);
  const endDate = parseISO(event.meeting_end_datetime);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendarButtonLoading, setCalendarButtonLoading] = useState(true);
  const [alreadyInCalendar, setAlreadyInCalendar] = useState(false);
  const [eventCalendarId, setEventCalendarId] = useState('');
  const [fetchedEvents, setFetchedEvents] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (dialogOpen && !fetchedEvents) {
      setCalendarButtonLoading(true);
      setFetchedEvents(true);
      getEvents(startDate, endDate).then((response) => {
        setCalendarButtonLoading(false);
        if (response) {
          response.forEach((item) => {
            if (
              item.summary &&
              item.summary.split(' (')[0] === event.title.split(' (')[0]
            ) {
              setAlreadyInCalendar(true);
              if (item.id) {
                setEventCalendarId(item.id);
              }
            }
          });
        }
      });
    }
  }, [dialogOpen, startDate, endDate, event.title, fetchedEvents]);

  return (
    <Dialog onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <MapPin className="mt-1 size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Location</p>
                <TagBadge
                  className="max-w-full mt-1"
                  colorHash={event.location}
                >
                  <span
                    className="truncate direction-rtl text-left"
                    title={
                      event.location ? event.location : 'No location specified'
                    }
                  >
                    {event.location}
                  </span>
                </TagBadge>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Building className="mt-1 size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Meeting Type</p>
                <TagBadge className="mt-1">
                  {getMeetingType(event.source_table)}
                </TagBadge>
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
              <CalendarOff className="mt-1 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">End Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(endDate, 'EEEE dd MMMM')}
                  <span className="mx-1">at</span>
                  {formatTime(parseISO(event.meeting_end_datetime), true)}
                </p>
              </div>
            </div>

            {event?.topic && (
              <div className="flex items-start gap-2">
                <Tag className="mt-1 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Topic</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <TagBadge>{event.topic}</TagBadge>
                  </div>
                </div>
              </div>
            )}

            {(event.member || event.attendees) && (
              <div className="flex items-start gap-2">
                <User className="mt-1 size-4 shrink-0 text-muted-foreground" />
                <div className="w-full">
                  <p className="mb-1 text-sm font-medium">Members</p>
                  <AvatarStack
                    member={event.member}
                    attendees={event.attendees}
                  />
                </div>
              </div>
            )}

            {event.description && (
              <div className="flex items-start gap-2 col-span-full">
                <Text className="mt-1 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            )}

            {event.similarity && (
              <div className="flex items-start gap-2 col-span-full">
                <Scale className="mt-1 size-4 shrink-0 text-muted-foreground" />
                <div className="w-full">
                  <p className="text-sm font-medium">Relevance</p>
                  <RelevanceScore meeting={event} type={'bar'} />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <DialogFooter>
          {event.meeting_url && (
            <Button variant="default" asChild>
              <a
                href={event.meeting_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
                <ExternalLink className="size-4" />
              </a>
            </Button>
          )}
          {!calendarButtonLoading && (
            <div>
              {!alreadyInCalendar && (
                <Button
                  variant="default"
                  asChild
                  onClick={() => {
                    setCalendarLoading(true);
                    saveToCalendar(
                      `${event.title} (${getMeetingType(event.source_table)})`,
                      (event.description ? event.description : '') +
                        (event.meeting_url ? ` (${event.meeting_url})` : ''),
                      event.location ? event.location : '',
                      event.meeting_start_datetime,
                      event.meeting_end_datetime,
                    ).then(async (needsGoogleAuth: boolean) => {
                      if (needsGoogleAuth) {
                        ToastOperations.showError({
                          title: 'Error',
                          message:
                            'Please link your Google account to save events to your calendar.',
                        });
                        await supabase.auth.linkIdentity({
                          provider: 'google',
                          options: {
                            redirectTo: `${window.location.origin}/auth/callback`,
                            queryParams: {
                              access_type: 'offline',
                              prompt: 'consent',
                            },
                            scopes: 'https://www.googleapis.com/auth/calendar',
                          },
                        });
                        setCalendarLoading(false);
                      } else {
                        ToastOperations.showSuccess({
                          title: 'Success',
                          message: 'Event saved to your calendar.',
                        });
                        setCalendarLoading(false);
                        setFetchedEvents(false);
                      }
                    });
                  }}
                  disabled={calendarLoading}
                >
                  <p>
                    {calendarLoading
                      ? Spinner({
                          size: 'xsmall',
                          className: 'text-white dark:text-black',
                        })
                      : 'Add to calendar'}
                    <CalendarPlus className="size-4" />
                  </p>
                </Button>
              )}
              {alreadyInCalendar && (
                <Button
                  onClick={() => {
                    const b64Id = b64EncodeUnicode(
                      eventCalendarId + ' primary',
                    );
                    window.open(
                      'https://www.google.com/calendar/event?eid=' +
                        b64Id.slice(0, -2),
                      '_blank',
                    );
                  }}
                >
                  Show in calendar
                  <CalendarCheck2 className="size-4" />
                </Button>
              )}
            </div>
          )}
          {calendarButtonLoading && (
            <Button>
              <Spinner size="xsmall" className="text-white dark:text-black" />
              <Calendar className="size-4" />
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
