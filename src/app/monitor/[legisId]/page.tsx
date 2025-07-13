import {
  ArrowLeft,
  BookOpen,
  CalendarCheck,
  Clock,
  Eye,
  FileText,
  MessageSquare,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { DocumentationGatewayCollapsible } from '@/components/monitor/DocumentationGatewayCollapsible';
import { KeyEventCollapsible } from '@/components/monitor/KeyEventCollapsible';
import { KeyPlayerCollapsible } from '@/components/monitor/KeyPlayerCollapsible';
import { MeetingCollapsible } from '@/components/monitor/MeetingCollapsible';
import { SubscribeButton } from '@/components/monitor/SubscribeButton';
import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  getLegislativeFile,
  getLegislativeMeetings,
} from '@/domain/actions/monitor';
import { LegislationStatus } from '@/domain/entities/monitor/types';
import ObservatoryOperations from '@/operations/monitor/MonitorOperations';
import MonitorOperations from '@/operations/monitor/MonitorOperations';

export default async function LegislationPage({
  params,
}: {
  params: Promise<{ legisId: string }>;
}) {
  const { legisId } = await params;
  const decodedLegisId = decodeURIComponent(legisId);

  const legislation = await getLegislativeFile({ id: decodedLegisId });
  const legislativeMeetings = await getLegislativeMeetings({
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
              {legislation.key_players.map((player, index) => (
                <KeyPlayerCollapsible
                  key={index}
                  player={player}
                  index={index}
                />
              ))}
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
              {legislation.key_events.map((event, index) => (
                <KeyEventCollapsible key={index} event={event} index={index} />
              ))}
            </CardContent>
          </Card>
        )}
        {legislation.documentation_gateway &&
          legislation.documentation_gateway.length > 0 && (
            <Card className="break-inside-avoid">
              <CardHeader className="flex items-center">
                <BookOpen className="h-4 w-4" />
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {legislation.documentation_gateway.map((document, index) => (
                  <DocumentationGatewayCollapsible
                    key={index}
                    document={document}
                    index={index}
                  />
                ))}
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
              {legislativeMeetings.map((meeting, index) => (
                <MeetingCollapsible
                  key={index}
                  meeting={meeting}
                  index={index}
                />
              ))}
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
            <Button variant="outline" size="sm" asChild>
              <Link
                href={`/chat?legislation_id=${encodeURIComponent(legislation.id)}`}
              >
                <MessageSquare className="h-3 w-3" />
                Chat with Legislation
              </Link>
            </Button>
            <SubscribeButton legislationId={legislation.id} />
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
