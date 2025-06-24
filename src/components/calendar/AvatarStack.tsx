import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Member } from '@/domain/entities/calendar/generated-types';

type AvatarStackProps = {
  members: Member[];
};

export function AvatarStack({ members }: AvatarStackProps) {
  const [visibleMembers, remainingMembers] = [
    members.slice(0, 3),
    members.slice(3),
  ];

  return (
    <div className="flex ml-auto -space-x-1 mb-1">
      {visibleMembers.map((member) => (
        <Tooltip key={member.id}>
          <TooltipTrigger asChild>
            <Avatar className="w-6 h-6 ring-1 ring-muted-foreground">
              <AvatarFallback className="w-6 h-6 bg-muted text-muted-foreground text-[10px]">
                {member.given_name[0] + '' + member.family_name[0]}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            {member.given_name + ' ' + member.family_name}
          </TooltipContent>
        </Tooltip>
      ))}

      {remainingMembers.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar
              className="w-6 h-6 ring-1 ring-muted-foreground shadow-md"
              style={{ zIndex: 100 - visibleMembers.length }}
            >
              <AvatarFallback className="w-6 h-6 bg-accent text-primary text-[10px]">
                +{remainingMembers.length}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent className="whitespace-pre-line text-center">
            {remainingMembers
              .map((m) => m.given_name + ' ' + m.family_name)
              .join('\n')}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
