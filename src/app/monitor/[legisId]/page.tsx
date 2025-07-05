import {
  ArrowLeft,
  CalendarCheck,
  ChevronDown,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import {
  getLegislativeFileAction,
  getLegislativeMeetingsAction,
} from '@/domain/actions/monitor';
import { LegislationStatus } from '@/domain/entities/monitor/types';
import { cn } from '@/lib/utils';
import ObservatoryOperations from '@/operations/monitor/MonitorOperations';
import MonitorOperations from '@/operations/monitor/MonitorOperations';

export default async function LegislationPage({
  params,
}: {
  params: Promise<{ legisId: string }>;
}) {
  const { legisId } = await params;
  const decodedLegisId = decodeURIComponent(legisId);

  const legislation = await getLegislativeFileAction({ id: decodedLegisId });
  const legislativeMeetings = await getLegislativeMeetingsAction({
    legislative_id: decodedLegisId,
  });

  if (!legislation) {
    notFound();
  }

  return (
    <Section className="space-y-4">
      <div className="space-y-1">
        <Button variant="link" asChild>
          <Link href="/monitor">
            <ArrowLeft className="h-4 w-4" />
            Back to Monitor
          </Link>
        </Button>
        <div className="flex flex-row items-center gap-2">
          <div className="flex items-center gap-2">
            {(() => {
              const status = (legislation.status ||
                'Other') as LegislationStatus;
              const config = ObservatoryOperations.statusConfig[status];
              return (
                <>
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="font-medium">{status}</span>
                </>
              );
            })()}
          </div>

          <Separator orientation="vertical" className="!h-5 hidden md:block" />
          <Badge className="font-mono" variant="secondary">
            {legislation.id}
          </Badge>
          <Badge variant="outline">
            {MonitorOperations.extractYearFromId(legislation.id)}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold leading-tight">
          {legislation.title}
        </h1>
      </div>
      <div className="columns-1 md:columns-2 gap-4 space-y-4">
        <Card className="break-inside-avoid">
          <CardHeader className="flex items-center">
            <FileText className="h-4 w-4" />
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Last Publication</span>
              <span className="font-medium">
                {legislation.lastpubdate || 'N/A'}
              </span>
            </div>

            {legislation.committee && (
              <>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Committee</span>
                  <span className="font-medium">{legislation.committee}</span>
                </div>
              </>
            )}

            {legislation.rapporteur && (
              <>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Rapporteur</span>
                  <span className="font-medium">{legislation.rapporteur}</span>
                </div>
              </>
            )}

            {legislation.subjects && legislation.subjects.length > 0 && (
              <>
                <Separator />
                <div className="flex justify-between items-start text-sm gap-2">
                  <span className="text-muted-foreground">Subjects</span>
                  <span className="font-medium text-right">
                    {legislation.subjects
                      .map((subject) => subject.replace(/^\d+(\.\d+)*\s+/, ''))
                      .join(', ')}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        {legislation.key_players && legislation.key_players.length > 0 && (
          <Card className="break-inside-avoid">
            <CardHeader className="flex items-center">
              <Users className="h-4 w-4" />
              <CardTitle>Key Players</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {legislation.key_players.map((player, index) => {
                const hasContent =
                  (player.rapporteurs && player.rapporteurs.length > 0) ||
                  (player.shadow_rapporteurs &&
                    player.shadow_rapporteurs.length > 0) ||
                  player.committee_link;

                return (
                  <Collapsible
                    key={index}
                    className="border-l-2 pl-3"
                    disabled={!hasContent}
                  >
                    <CollapsibleTrigger className="flex items-start justify-between w-full p-0 text-left group gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">
                          {player.institution}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {player.committee_full || player.committee}
                        </p>
                      </div>

                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180',
                          !hasContent && 'opacity-0',
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {player.committee_link && (
                          <Link
                            href={player.committee_link}
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
                          >
                            Committee Details
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                      </div>

                      {player.rapporteurs && player.rapporteurs.length > 0 && (
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="text-xs font-medium text-muted-foreground">
                            Rapporteurs:
                          </span>
                          {player.rapporteurs?.map(
                            (rapporteur, idx) =>
                              rapporteur.link && (
                                <Link
                                  href={rapporteur.link}
                                  key={idx}
                                  className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
                                >
                                  {rapporteur.name}
                                  <ExternalLink className="h-3 w-3" />
                                </Link>
                              ),
                          )}
                        </div>
                      )}

                      {player.shadow_rapporteurs &&
                        player.shadow_rapporteurs.length > 0 && (
                          <div className="flex flex-wrap items-center gap-x-2">
                            <span className="text-xs font-medium text-muted-foreground">
                              Shadow Rapporteurs:
                            </span>
                            {player.shadow_rapporteurs?.map(
                              (rapporteur, idx) =>
                                rapporteur.link && (
                                  <Link
                                    href={rapporteur.link}
                                    key={idx}
                                    className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
                                  >
                                    {rapporteur.name}
                                    <ExternalLink className="h-3 w-3" />
                                  </Link>
                                ),
                            )}
                          </div>
                        )}
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </CardContent>
          </Card>
        )}
        {legislation.key_events && legislation.key_events.length > 0 && (
          <Card className="break-inside-avoid">
            <CardHeader className="flex items-center">
              <CalendarCheck className="h-4 w-4" />
              <CardTitle>Key Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {legislation.key_events.map((event, index) => {
                const hasContent =
                  event.summary ||
                  event.reference?.link ||
                  event.reference?.text;

                return (
                  <Collapsible
                    key={index}
                    className="border-l-2 pl-3"
                    disabled={!hasContent}
                  >
                    <CollapsibleTrigger className="flex items-start justify-between w-full p-0 text-left group gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">
                          {event.event || 'Event'}
                        </p>
                        {event.date && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180',
                          !hasContent && 'opacity-0',
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {event.summary && (
                          <Link
                            href={event.summary}
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
                          >
                            View Summary
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                        {event.reference?.link && (
                          <Link
                            href={event.reference.link}
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1 font-mono"
                          >
                            {event.reference.text}
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </CardContent>
          </Card>
        )}
        {legislativeMeetings && legislativeMeetings.length > 0 && (
          <Card className="break-inside-avoid">
            <CardHeader className="flex items-center">
              <Clock className="h-4 w-4" />
              <CardTitle>Related Meetings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {legislativeMeetings.map((meeting, index) => {
                const hasContent =
                  meeting.meeting_location ||
                  meeting.member_capacity ||
                  meeting.associated_committee_or_delegation_name ||
                  meeting.procedure_reference;

                return (
                  <Collapsible
                    key={index}
                    className="border-l-2 pl-3"
                    disabled={!hasContent}
                  >
                    <CollapsibleTrigger className="flex items-start justify-between w-full p-0 text-left group gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">
                          {meeting.title}
                        </p>
                        {meeting.meeting_date && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(
                              meeting.meeting_date,
                            ).toLocaleDateString()}
                          </p>
                        )}
                        {meeting.member_name && (
                          <p className="text-xs text-muted-foreground">
                            {meeting.member_name}
                          </p>
                        )}
                      </div>

                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180',
                          !hasContent && 'hidden',
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1 space-y-1">
                      {meeting.meeting_location && (
                        <div className="text-xs">
                          <span className="font-medium text-muted-foreground">
                            Location:
                          </span>{' '}
                          <span className="text-foreground">
                            {meeting.meeting_location}
                          </span>
                        </div>
                      )}

                      {meeting.member_capacity && (
                        <div className="text-xs">
                          <span className="font-medium text-muted-foreground">
                            Capacity:
                          </span>{' '}
                          <span className="text-foreground">
                            {meeting.member_capacity}
                          </span>
                        </div>
                      )}

                      {meeting.associated_committee_or_delegation_name && (
                        <div className="text-xs">
                          <span className="font-medium text-muted-foreground">
                            Committee:
                          </span>{' '}
                          <span className="text-foreground">
                            {meeting.associated_committee_or_delegation_name}
                          </span>
                        </div>
                      )}

                      {meeting.procedure_reference && (
                        <div className="text-xs">
                          <span className="font-medium text-muted-foreground">
                            Reference:
                          </span>{' '}
                          <span className="text-foreground font-mono">
                            {meeting.procedure_reference}
                          </span>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </CardContent>
          </Card>
        )}
        <Card className="break-inside-avoid">
          <CardHeader className="flex items-center">
            <Zap className="h-4 w-4" />
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {legislation.link && (
              <Button variant="outline" size="sm" asChild>
                <Link href={legislation.link}>
                  <Eye className="h-3 w-3" />
                  View Details
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
