import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

import { EventDetailsDialog } from '@/components/MonthViewCalendar/EventDetailsDialog';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { useDragDrop } from '@/domain/hooks/meetingHooks';

interface DraggableEventProps {
  event: MeetingData;
  children: ReactNode;
  className?: string;
}

export function DraggableEvent({
  event,
  children,
  className,
}: DraggableEventProps) {
  const { startDrag, endDrag, isDragging, draggedEvent } = useDragDrop();

  const isCurrentlyDragged =
    isDragging && draggedEvent?.meeting_id === event.meeting_id;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <EventDetailsDialog event={event}>
      <motion.div
        className={`${className || ''} ${isCurrentlyDragged ? 'opacity-50 cursor-grabbing' : 'cursor-grab'}`}
        draggable
        onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClick(e)}
        onDragStart={(e) => {
          (e as DragEvent).dataTransfer!.setData(
            'text/plain',
            event.meeting_id.toString(),
          );
          startDrag(event);
        }}
        onDragEnd={() => {
          endDrag();
        }}
      >
        {children}
      </motion.div>
    </EventDetailsDialog>
  );
}