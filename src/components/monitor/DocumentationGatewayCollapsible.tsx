import { parse } from 'date-fns';
import { ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { DocumentData } from '@/domain/entities/monitor/generated-types';
import { cn } from '@/lib/utils';

interface DocumentationGatewayCollapsibleProps {
  document: DocumentData;
  index: number;
}

export function DocumentationGatewayCollapsible({
  document,
  index,
}: DocumentationGatewayCollapsibleProps) {
  const hasContent =
    document.summary || document.reference?.link || document.reference?.text;

  return (
    <Collapsible key={index} className="border-l-2 pl-3" disabled={!hasContent}>
      <CollapsibleTrigger className="flex items-start justify-between w-full p-0 text-left group gap-2">
        <div className="flex-1">
          {document.document_type && (
            <p className="text-sm font-medium leading-tight">
              {document.document_type}
            </p>
          )}
          {document.date && document.date.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {parse(
                document.date,
                'dd/MM/yyyy',
                new Date(),
              ).toLocaleDateString()}{' '}
              ({document.date})
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
      <CollapsibleContent className="mt-1 flex gap-2">
        {document.summary && (
          <Link
            href={document.summary}
            className="text-xs link-highlight inline-flex items-center font-mono gap-1"
          >
            Summary
            <ExternalLink className="h-3 w-3" />
          </Link>
        )}
        {document.reference?.link && (
          <Link
            href={document.reference.link}
            className="text-xs link-highlight inline-flex items-center font-mono gap-1"
          >
            {document.reference.text || 'View'}
            <ExternalLink className="h-3 w-3" />
          </Link>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
