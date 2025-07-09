'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Check, MoreVertical, Power, PowerOff, X } from 'lucide-react';

import { AlertDetailsDialog } from '@/components/inbox/AlertDetailsDialog';
import { DataTableColumnHeader } from '@/components/inbox/ColHeader';
import { ViewAlertMeetingsDialog } from '@/components/inbox/ViewAlertMeetingsDialog';
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

import { AlertActions, AlertTableItem } from './alertTypes';

export const getAlertColumns = ({
  onToggleActive,
}: AlertActions): ColumnDef<AlertTableItem>[] => [
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
      <AlertDetailsDialog
        alert={row.original}
        trigger={
          <div className="font-medium cursor-pointer hover:text-blue-800 underline">
            {row.getValue('title')}
          </div>
        }
      />
    ),
  },
  {
    accessorKey: 'date',
    header: () => (
      <div className="flex items-center justify-center w-full">
        Creation date
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue('date') as string | null;
      if (date === null) {
        return (
          <div className="flex items-center justify-end gap-2">
            <span>-</span>
          </div>
        );
      }
      return (
        <div className="flex items-center justify-center gap-2">
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'is_active',
    header: () => (
      <div className="flex items-center justify-center w-full">Active</div>
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('is_active') as boolean;
      return (
        <div className="flex items-center justify-center">
          {isActive ? (
            <Check className="white w-5 h-5" />
          ) : (
            <X className="text-red-600 w-5 h-5" />
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <ViewAlertMeetingsDialog
                  alert={row.original}
                  triggerStyle="actions"
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  onToggleActive(row.original.id, !row.original.is_active)
                }
                className={
                  row.original.is_active
                    ? 'text-destructive focus:text-destructive'
                    : ''
                }
              >
                {row.original.is_active ? (
                  <>
                    <PowerOff className="mr-2 h-4 w-4" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Power className="mr-2 h-4 w-4" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
