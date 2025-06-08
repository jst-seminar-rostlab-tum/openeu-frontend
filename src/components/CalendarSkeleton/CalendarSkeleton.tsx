import { CalendarHeaderSkeleton } from '@/components/CalendarSkeleton/CalendarHeaderSkeleton';
import { MonthViewSkeleton } from '@/components/CalendarSkeleton/MonthViewSkeleton';

export function CalendarSkeleton() {
  return (
    <div className="container mx-auto">
      <div className="flex h-screen flex-col">
        <CalendarHeaderSkeleton />
        <div className="flex-1">
          <MonthViewSkeleton />
        </div>
      </div>
    </div>
  );
}
