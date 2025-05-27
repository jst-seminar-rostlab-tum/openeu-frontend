"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';

interface DragDropContextType {
  draggedEvent: MeetingData | null;
  isDragging: boolean;
  startDrag: (event: MeetingData) => void;
  endDrag: () => void;
  handleEventDrop: (date: Date, hour?: number, minute?: number) => void;
  onEventDropped?: (event: MeetingData, newStartDate: Date, newEndDate: Date) => void;
  setOnEventDropped: (callback: (event: MeetingData, newStartDate: Date, newEndDate: Date) => void) => void;
}

export const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export function DragDropProvider({ children }: { children: ReactNode }) {
  const [draggedEvent, setDraggedEvent] = useState<MeetingData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [onEventDropped, setOnEventDroppedCallback] = useState<((event: MeetingData, newStartDate: Date, newEndDate: Date) => void) | undefined>(undefined);

  const startDrag = (event: MeetingData) => {
    setDraggedEvent(event);
    setIsDragging(true);
  };

  const endDrag = () => {
    setDraggedEvent(null);
    setIsDragging(false);
  };

  const handleEventDrop = (targetDate: Date, hour?: number, minute?: number) => {
    if (!draggedEvent || !onEventDropped) return;

    const originalStart = new Date(draggedEvent.meeting_start_datetime);
    const originalEnd = new Date(draggedEvent.meeting_end_datetime);
    const duration = originalEnd.getTime() - originalStart.getTime();

    const newStart = new Date(targetDate);
    if (hour !== undefined) {
      newStart.setHours(hour);
      newStart.setMinutes(minute || 0);
    } else {
      newStart.setHours(originalStart.getHours());
      newStart.setMinutes(originalStart.getMinutes());
    }

    const newEnd = new Date(newStart.getTime() + duration);

    // Check if the event is being dropped in the same position
    const isSamePosition =
        originalStart.getFullYear() === newStart.getFullYear() &&
        originalStart.getMonth() === newStart.getMonth() &&
        originalStart.getDate() === newStart.getDate() &&
        originalStart.getHours() === newStart.getHours() &&
        originalStart.getMinutes() === newStart.getMinutes();

    if (!isSamePosition) {
      onEventDropped(draggedEvent, newStart, newEnd);
    }

    endDrag();
  };

  const setOnEventDropped = (callback: (event: MeetingData, newStartDate: Date, newEndDate: Date) => void) => {
    setOnEventDroppedCallback(() => callback);
  };

  return (
    <DragDropContext.Provider
      value={{
        draggedEvent,
        isDragging,
        startDrag,
        endDrag,
        handleEventDrop,
        onEventDropped,
        setOnEventDropped,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
}

