'use client';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/kanban';
import { LegislativeFile } from '@/domain/entities/monitor/generated-types';
import { cn, COLOR_SCHEMES, getColorKeyByHash } from '@/lib/utils';
import MonitorOperations from '@/operations/monitor/MonitorOperations';

interface TanStackKanbanProps {
  groupedData: Record<string, LegislativeFile[]>;
  className?: string;
  visibleColumns: Set<string>;
  statusColumnsWithData: string[];
}

export function TanStackKanban({
  groupedData,
  className,
  visibleColumns,
  statusColumnsWithData,
}: TanStackKanbanProps) {
  const visibleStatusColumns = statusColumnsWithData.filter((status) =>
    visibleColumns.has(status),
  );

  return (
    <KanbanProvider dragDisabled={true} className={cn('flex-1', className)}>
      {visibleStatusColumns.map((status) => {
        const items = groupedData[status] || [];
        const colorKey = getColorKeyByHash(status);
        const dotColor = COLOR_SCHEMES[colorKey].dot;

        return (
          <KanbanBoard key={status} id={status}>
            <KanbanHeader>
              <div className="flex shrink-0 items-start gap-2 justify-between">
                <div className="flex items-start gap-2">
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full shrink-0 mt-1.5',
                      dotColor,
                    )}
                  />
                  <p className="font-semibold text-sm">{status}</p>
                </div>
                <Badge>{items.length}</Badge>
              </div>
            </KanbanHeader>
            <KanbanCards>
              {items.map((item: LegislativeFile, index: number) => {
                const legislationUrl = `/monitor/${encodeURIComponent(item.id)}`;

                return (
                  <Link key={item.id} href={legislationUrl} className="block">
                    <KanbanCard
                      id={item.id}
                      name={item.title}
                      index={index}
                      parent={status}
                      className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <Badge className="font-mono" variant="secondary">
                            {item.id}
                          </Badge>
                          <span>
                            {MonitorOperations.extractYearFromId(item.id)}
                          </span>
                        </div>

                        <h3
                          className="font-medium text-sm leading-tight"
                          title={item.title}
                        >
                          {item.title}
                        </h3>

                        {item.committee && (
                          <div className="text-xs text-blue-800 dark:text-blue-300">
                            {item.committee}
                          </div>
                        )}
                      </div>
                    </KanbanCard>
                  </Link>
                );
              })}
            </KanbanCards>
          </KanbanBoard>
        );
      })}
    </KanbanProvider>
  );
}
