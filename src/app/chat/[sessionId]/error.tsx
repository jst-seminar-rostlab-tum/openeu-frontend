'use client';

import { AlertCircle, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Chat Session Not Found</CardTitle>
          <CardDescription>
            The chat session you&apos;re looking for doesn&apos;t exist or may
            have been deleted.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="flex flex-col gap-3">
            <Button onClick={reset} className="w-full" size="sm">
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" className="w-full" size="sm" asChild>
              <Link href="/chat">
                <Home className="h-4 w-4" />
                Start New Chat
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
