import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Person } from '@/domain/entities/calendar/generated-types';
import { extractInitials } from '@/lib/utils';

type AvatarStackProps = {
  member?: Person | null;
  attendees?: string | null;
};

type StackItem = {
  key: string;
  label: string;
  initials: string;
  role: 'Member' | 'Attendee';
};

export function AvatarStack({ member, attendees }: AvatarStackProps) {
  const attendeeList = attendees ? attendees.split(/\s*;\s*/) : [];

  const stack: StackItem[] = [];

  if (member) {
    const memberName =
      `${member.givenName || ''} ${member.familyName || ''}`.trim();

    if (memberName) {
      stack.push({
        key: 'member',
        label: memberName,
        initials: extractInitials(memberName),
        role: 'Member',
      });
    }
  }

  attendeeList.forEach((name, idx) => {
    if (!name || typeof name !== 'string') return;

    const trimmedName = name.trim();
    if (trimmedName) {
      stack.push({
        key: `attendee-${idx}`,
        label: trimmedName,
        initials: extractInitials(trimmedName),
        role: 'Attendee',
      });
    }
  });

  const visible = stack.slice(0, 3);
  const remaining = stack.slice(3);

  return (
    <div className="flex ml-auto -space-x-1 mb-1">
      {visible.map(({ key, label, initials, role }) => (
        <Tooltip key={key}>
          <TooltipTrigger asChild>
            <Avatar className="w-6 h-6 ring-1 ring-muted-foreground">
              <AvatarFallback
                className={`w-6 h-6 text-[10px] ${
                  role === 'Member'
                    ? 'bg-neutral-300 text-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <div>{label}</div>
            <div className="text-xs text-muted-foreground font-normal text-center">
              {role}
            </div>
          </TooltipContent>
        </Tooltip>
      ))}

      {remaining.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar
              className="w-6 h-6 ring-1 ring-muted-foreground shadow-md"
              style={{ zIndex: 100 - visible.length }}
            >
              <AvatarFallback className="w-6 h-6 bg-accent text-primary text-[10px]">
                +{remaining.length}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent className="whitespace-pre-line text-left">
            {['Member', 'Attendee'].map((roleType) => {
              const group = remaining.filter((item) => item.role === roleType);
              if (group.length === 0) return null;

              return (
                <div key={roleType} className="mb-2">
                  <div className="text-xs text-muted-foreground mb-1">
                    {roleType}s:
                  </div>
                  {group.map((item) => (
                    <div key={item.key}>{item.label}</div>
                  ))}
                </div>
              );
            })}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
