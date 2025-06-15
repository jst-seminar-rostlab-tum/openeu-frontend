import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

import { EventDetailsDialog } from '@/components/calendar/MonthViewCalendar/EventDetailsDialog';
import { Meeting } from '@/domain/entities/calendar/generated-types';

interface DraggableEventProps {
  event: Meeting;
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
