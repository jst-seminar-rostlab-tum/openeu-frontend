import { ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { KeyEvent } from '@/domain/entities/monitor/generated-types';
import { cn } from '@/lib/utils';

interface KeyEventCollapsibleProps {
  event: KeyEvent;
  index: number;
}

export function KeyEventCollapsible({
  event,
  index,
}: KeyEventCollapsibleProps) {
  const hasContent =
    event.summary || event.reference?.link || event.reference?.text;

  return (
    <Collapsible key={index} className="border-l-2 pl-3" disabled={!hasContent}>
      <CollapsibleTrigger className="flex items-start justify-between w-full p-0 text-left group gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium leading-tight">{event.event}</p>
          <p className="text-xs text-muted-foreground">
            {event.date && new Date(event.date).toLocaleDateString()}
          </p>
        </div>

        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180',
            !hasContent && 'hidden',
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
}
