import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { europeanQuotes } from '@/data/not-found';

function getRandomQuote() {
  return europeanQuotes[Math.floor(Math.random() * europeanQuotes.length)];
}

export default function NotFound() {
  const quote = getRandomQuote();

  return (
    <Section variant="screenCentered" className="flex-col text-center gap-6">
      <AlertCircle className="w-20 h-20 text-blue-500" />
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <div className="max-w-md">
        <blockquote className="italic text-lg text-gray-600 dark:text-gray-400">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
      <Button asChild variant="link" className="text-lg underline">
        <Link href="/">Home</Link>
      </Button>
    </Section>
  );
}
