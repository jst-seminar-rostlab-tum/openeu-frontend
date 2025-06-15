import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

import { EventDetailsDialog } from '@/components/calendar/MonthViewCalendar/EventDetailsDialog';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';

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
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <EventDetailsDialog event={event}>
      <motion.div
        className={`${className || ''} cursor-grab`}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClick(e)}
      >
        {children}
      </motion.div>
    </EventDetailsDialog>
  );
}
