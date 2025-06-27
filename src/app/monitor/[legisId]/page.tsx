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
import ObservatoryOperations from '@/operations/monitor/MonitorOperations';

export default async function LegislationPage({
  params,
}: {
  params: Promise<{ legisId: string }>;
}) {
  const { legisId } = await params;
  const decodedLegisId = decodeURIComponent(legisId);
  const legislation = ObservatoryOperations.getLegislationById(decodedLegisId);

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
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  ObservatoryOperations.getStatusConfig()[legislation.status]
                    .color,
              }}
            />
            <span className="font-medium">
              {ObservatoryOperations.getStatusConfig()[legislation.status].name}
            </span>
          </div>

          <Separator orientation="vertical" className="!h-5 hidden md:block" />
          <Badge className="font-mono" variant="secondary">
            {legislation.id}
          </Badge>
          <Badge variant="outline">{legislation.year}</Badge>
        </div>
        <h1 className="text-2xl font-bold leading-tight">
          {legislation.title}
        </h1>
      </div>
      <div className="columns-1 md:columns-2 gap-4 space-y-4">
        <Card className="break-inside-avoid">
          <CardHeader className="flex items-center">
            <Calendar className="h-4 w-4" />
            <CardTitle>Timeline & Procedure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Submitted</span>
              <span className="font-medium">
                {legislation.submissionDate?.toLocaleDateString() || 'N/A'}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Last Update</span>
              <span className="font-medium">
                {legislation.lastUpdate?.toLocaleDateString() || 'N/A'}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Procedure Type</span>
              <Badge variant="outline" className="font-mono text-xs">
                {legislation.procedureType}
              </Badge>
            </div>
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
        {legislation.rapporteurs.length > 0 && (
          <Card className="break-inside-avoid">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <CardTitle>Rapporteurs</CardTitle>
              </div>
              <Badge>{legislation.rapporteurs.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {legislation.rapporteurs.map((rapporteur, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium truncate">
                      {rapporteur.name}
                    </span>
                    <Badge variant="secondary" className="text-xs ml-2">
                      {rapporteur.group}
                    </Badge>
                  </div>
                ))}
              </div>
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
