import React, { ReactNode } from 'react';

interface DroppableAreaProps {
  date: Date;
  hour?: number;
  minute?: number;
  children: ReactNode;
  className?: string;
}

export function DroppableArea({ children, className }: DroppableAreaProps) {
  return (
    <div
      className={`${className || ''} `}
      onDragOver={(e) => {
        // Prevent default to allow drop
        e.preventDefault();
        e.currentTarget.classList.add('bg-primary/10');
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove('bg-primary/10');
      }}
    >
      {children}
    </div>
  );
}
