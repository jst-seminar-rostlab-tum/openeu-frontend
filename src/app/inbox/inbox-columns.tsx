'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/inbox/ColHeader';
import { InboxItem } from '@/domain/entities/inbox-item/inbox-item';

interface ActionsProps {
  onView: (item: InboxItem) => void;
}

// Memoized color function to prevent recreation
const getRelevanceColor = (score: number): string => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  if (score >= 40) return 'bg-orange-500';
  return 'bg-red-500';
};

export const createColumns = ({
  onView,
}: ActionsProps): ColumnDef<InboxItem>[] => [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div
        className="font-medium cursor-pointer hover:text-blue-800 underline px-4 py-2 flex items-center"
        onClick={() => onView(row.original)}
      >
        {row.getValue('title')}
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      // Format the ISO date string for display
      const dateString = row.getValue('date') as string;
      return (
        <div className="px-4 py-2 flex items-center">
          {new Date(dateString).toLocaleDateString()}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      // Parse the ISO date string directly for filtering
      const rowDate = new Date(row.getValue(id) as string);
      const { from, to } = value as { from?: Date; to?: Date };

      if (!from && !to) return true;
      if (from && !to) return rowDate >= from;
      if (!from && to) return rowDate <= to;
      if (from && to) return from <= rowDate && rowDate <= to;
      return true;
    },
  },
  {
    accessorKey: 'country',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => (
      <div className="px-4 py-2 flex items-center">
        {row.getValue('country')}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'relevanceScore',
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Relevance Score" />
      </div>
    ),
    cell: ({ row }) => {
      const score = row.getValue('relevanceScore') as number | undefined;

      if (score === undefined) {
        return (
          <div className="flex items-center justify-end gap-2 px-4 py-2 h-full">
            <span>-</span>
          </div>
        );
      }

      return (
        <div className="flex items-center justify-end gap-2 px-4 py-2 h-full">
          <span>{(score * 100).toFixed(2)}%</span>
          <div
            className={`w-2 h-2 rounded-full ${getRelevanceColor(score * 100)}`}
            style={{ opacity: 0.75 }}
          />
        </div>
      );
    },
  },
];
