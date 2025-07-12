import { ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
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
          <div className="flex items-center gap-2 mb-1">
            {document.document_type && (
              <Badge variant="secondary" className="text-xs">
                {document.document_type}
              </Badge>
            )}
            {document.date && (
              <span className="text-xs text-muted-foreground">
                {new Date(document.date).toLocaleDateString()}
              </span>
            )}
          </div>
          {document.reference?.text && (
            <p className="text-sm font-medium leading-tight">
              {document.reference.text}
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
        <div className="flex items-center gap-2">
          {document.summary && (
            <p className="text-xs text-muted-foreground">{document.summary}</p>
          )}
          {document.reference?.link && (
            <Link
              href={document.reference.link}
              className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
            >
              View Document
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
