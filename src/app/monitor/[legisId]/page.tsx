import {
  ArrowLeft,
  Building,
  Calendar,
  ExternalLink,
  FileText,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getLegislativeFileAction } from '@/domain/actions/monitor';
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

  // Fetch data using server action
  const legislation = await getLegislativeFileAction(decodedLegisId);

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
            <Calendar className="h-4 w-4" />
            <CardTitle>Timeline & Publication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Last Publication</span>
              <span className="font-medium">
                {legislation.lastpubdate || 'N/A'}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Procedure Reference</span>
              <Badge variant="outline" className="font-mono text-xs">
                {legislation.id}
              </Badge>
            </div>

            {/* TODO: Add UI for new timeline fields */}
            {/* - Extract dates from key_events array */}
            {/* - Show submission date from key_events */}
            {/* - Show procedural stages from key_events */}
          </CardContent>
        </Card>
        {legislation.committee && (
          <Card className="break-inside-avoid">
            <CardHeader className="flex items-center">
              <Building className="h-4 w-4" />
              <CardTitle>Committee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {legislation.committee}
              </p>
            </CardContent>
          </Card>
        )}
        {legislation.rapporteur && (
          <Card className="break-inside-avoid">
            <CardHeader className="flex items-center">
              <Users className="h-4 w-4" />
              <CardTitle>Rapporteur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{legislation.rapporteur}</p>
            </CardContent>
          </Card>
        )}
        {legislation.key_events && legislation.key_events.length > 0 && (
          <Card className="break-inside-avoid">
            <CardHeader className="flex items-center">
              <Calendar className="h-4 w-4" />
              <CardTitle>Key Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {legislation.key_events.slice(0, 5).map((event, index) => (
                <div
                  key={index}
                  className="border-l-2 border-muted pl-3 pb-2 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">
                        {event.event || 'Event'}
                      </p>
                      {event.summary && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {event.summary}
                        </p>
                      )}
                    </div>
                    {event.date && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {legislation.key_events.length > 5 && (
                <p className="text-xs text-muted-foreground text-center pt-2 border-t">
                  +{legislation.key_events.length - 5} more events
                </p>
              )}
            </CardContent>
          </Card>
        )}
        <Card className="break-inside-avoid">
          <CardHeader className="flex items-center">
            <ExternalLink className="h-4 w-4" />
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="#">
                <FileText className="h-3 w-3" />
                View Full Text
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="#">
                <Calendar className="h-3 w-3" />
                View Schedule
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="#">
                <ExternalLink className="h-3 w-3" />
                EU Parliament Page
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
