'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Archive, Eye, MoreVertical, Trash2 } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/Inbox/ColHeader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InboxItem } from '@/domain/entities/inbox-item/inbox-item';

interface ActionsProps {
  onView: (item: InboxItem) => void;
  onArchive: (itemId: string) => void;
  onDelete: (itemId: string) => void;
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
  onArchive,
  onDelete,
}: ActionsProps): ColumnDef<InboxItem>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div
        className="font-medium cursor-pointer hover:text-blue-800 underline"
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
      return <div>{new Date(dateString).toLocaleDateString()}</div>;
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
    cell: ({ row }) => <div>{row.getValue('country')}</div>,
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
      const score = row.getValue('relevanceScore') as number;
      return (
        <div className="flex items-center justify-end gap-2">
          <span>{score}%</span>
          <div
            className={`w-2 h-2 rounded-full ${getRelevanceColor(score)}`}
            style={{ opacity: 0.75 }}
          />
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onView(item)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onArchive(item.id)}>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(item.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
