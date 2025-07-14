'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  DndContext,
  rectIntersection,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

export type { DragEndEvent } from '@dnd-kit/core';

export type Status = {
  id: string;
  name: string;
  color: string;
};

export type Feature = {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: Status;
};

const KanbanContext = createContext<{ dragDisabled: boolean }>({ dragDisabled: false });

export type KanbanBoardProps = {
  id: Status['id'];
  children: ReactNode;
  className?: string;
};

export const KanbanBoard = ({ id, children, className }: KanbanBoardProps) => {
  const { dragDisabled } = useContext(KanbanContext);
  const { isOver, setNodeRef } = useDroppable({ 
    id,
    disabled: dragDisabled,
  });

  return (
    <div
      className={cn(
        'flex h-full min-h-40 w-xs flex-col gap-2 rounded-md border bg-secondary p-2 text-xs shadow-sm outline-2 transition-all flex-shrink-0',
        !dragDisabled && isOver ? 'outline-primary' : 'outline-transparent',
        className
      )}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export type KanbanCardProps = Pick<Feature, 'id' | 'name'> & {
  index: number;
  parent: string;
  children?: ReactNode;
  className?: string;
};

export const KanbanCard = ({
  id,
  name,
  index,
  parent,
  children,
  className,
}: KanbanCardProps) => {
  const { dragDisabled } = useContext(KanbanContext);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { index, parent },
      disabled: dragDisabled,
    });

  return (
    <Card
      className={cn(
        'rounded-md p-3 shadow-xs',
        !dragDisabled && isDragging && 'cursor-grabbing',
        dragDisabled ? 'cursor-pointer' : 'cursor-grab',
        className
      )}
      style={{
        transform: transform
          ? `translateX(${transform.x}px) translateY(${transform.y}px)`
          : 'none',
      }}
      {...(dragDisabled ? {} : listeners)}
      {...(dragDisabled ? {} : attributes)}
      ref={setNodeRef}
    >
      {children ?? <p className="m-0 font-medium text-sm">{name}</p>}
    </Card>
  );
};

export type KanbanCardsProps = {
  children: ReactNode;
  className?: string;
};

export const KanbanCards = ({ children, className }: KanbanCardsProps) => (
  <div className={cn('flex flex-1 flex-col gap-2 overflow-y-auto scrollbar-custom', className)}>{children}</div>
);

export type KanbanHeaderProps =
  | {
      children: ReactNode;
    }
  | {
      name: Status['name'];
      color: Status['color'];
      className?: string;
    };

export const KanbanHeader = (props: KanbanHeaderProps) =>
  'children' in props ? (
    props.children
  ) : (
    <div className={cn('flex shrink-0 items-center gap-2', props.className)}>
      <div
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: props.color }}
      />
      <p className="m-0 font-semibold text-sm">{props.name}</p>
    </div>
  );

export type KanbanProviderProps = {
  children: ReactNode;
  onDragEnd?: (event: DragEndEvent) => void;
  className?: string;
  dragDisabled?: boolean;
};

export const KanbanProvider = ({
  children,
  onDragEnd,
  className,
  dragDisabled = false,
}: KanbanProviderProps) => (
  <KanbanContext.Provider value={{ dragDisabled }}>
    <DndContext 
      collisionDetection={rectIntersection} 
      onDragEnd={dragDisabled ? undefined : onDragEnd}
    >
      <div
        className={cn('flex w-full gap-3 overflow-x-auto scrollbar-custom', className)}
      >
        {children}
      </div>
    </DndContext>
  </KanbanContext.Provider>
);
