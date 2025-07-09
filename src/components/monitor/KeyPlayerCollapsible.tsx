import { ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  KeyPlayer,
  Rapporteur,
} from '@/domain/entities/monitor/generated-types';
import { cn } from '@/lib/utils';

interface KeyPlayerCollapsibleProps {
  player: KeyPlayer;
  index: number;
}

export function KeyPlayerCollapsible({
  player,
  index,
}: KeyPlayerCollapsibleProps) {
  const hasContent =
    (player.rapporteurs && player.rapporteurs.length > 0) ||
    (player.shadow_rapporteurs && player.shadow_rapporteurs.length > 0) ||
    player.committee_link;

  return (
    <Collapsible key={index} className="border-l-2 pl-3" disabled={!hasContent}>
      <CollapsibleTrigger className="flex items-start justify-between w-full p-0 text-left group gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium leading-tight">
            {player.institution}
          </p>
          <p className="text-xs text-muted-foreground">
            {player.committee_full || player.committee}
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
          {player.committee_link && (
            <Link
              href={player.committee_link}
              className="text-xs inline-flex items-center gap-1 link-highlight"
            >
              Committee Details
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>

        {player.rapporteurs && player.rapporteurs.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="text-xs font-medium text-muted-foreground">
              Rapporteurs:
            </span>
            {player.rapporteurs?.map(
              (rapporteur: Rapporteur, idx: number) =>
                rapporteur.link && (
                  <Link
                    href={rapporteur.link}
                    key={idx}
                    className="text-xs inline-flex items-center gap-1 link-highlight"
                  >
                    {rapporteur.name}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                ),
            )}
          </div>
        )}

        {player.shadow_rapporteurs && player.shadow_rapporteurs.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="text-xs font-medium text-muted-foreground">
              Shadow Rapporteurs:
            </span>
            {player.shadow_rapporteurs?.map(
              (rapporteur: Rapporteur, idx: number) =>
                rapporteur.link && (
                  <Link
                    href={rapporteur.link}
                    key={idx}
                    className="text-xs inline-flex items-center gap-1 link-highlight"
                  >
                    {rapporteur.name}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                ),
            )}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
