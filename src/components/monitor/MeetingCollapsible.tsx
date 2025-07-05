import { ChevronDown } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { LegislativeMeeting } from '@/domain/entities/monitor/generated-types';
import { cn } from '@/lib/utils';

interface MeetingCollapsibleProps {
  meeting: LegislativeMeeting;
  index: number;
}

export function MeetingCollapsible({
  meeting,
  index,
}: MeetingCollapsibleProps) {
  const hasContent =
    meeting.meeting_location ||
    meeting.member_capacity ||
    meeting.associated_committee_or_delegation_name;

  return (
    <Collapsible key={index} className="border-l-2 pl-3" disabled={!hasContent}>
      <CollapsibleTrigger className="flex items-start justify-between w-full p-0 text-left group gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium leading-tight">{meeting.title}</p>
          <p className="text-xs text-muted-foreground">
            {[
              meeting.meeting_date &&
                new Date(meeting.meeting_date).toLocaleDateString(),
              meeting.member_name,
            ]
              .filter(Boolean)
              .join(', ')}
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
        {meeting.meeting_location && (
          <div className="text-xs">
            <span className="font-medium text-muted-foreground">Location:</span>{' '}
            <span className="text-foreground">{meeting.meeting_location}</span>
          </div>
        )}

        {meeting.member_capacity && (
          <div className="text-xs">
            <span className="font-medium text-muted-foreground">Capacity:</span>{' '}
            <span className="text-foreground">{meeting.member_capacity}</span>
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
      </CollapsibleContent>
    </Collapsible>
  );
}
