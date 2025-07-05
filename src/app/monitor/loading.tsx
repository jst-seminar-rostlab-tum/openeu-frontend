import { KanbanSkeleton } from '@/components/monitor/KanbanSkeleton';
import { ToolbarSkeleton } from '@/components/monitor/ToolbarSkeleton';

export default function MonitorSkeleton() {
  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col gap-3 p-4">
      <ToolbarSkeleton />
      <KanbanSkeleton />
    </div>
  );
}
