'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Archive, ArchiveRestore, Check, MoreVertical, X } from 'lucide-react';

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
import { AlertActions, AlertTableItem } from '@/domain/entities/alerts/alert';

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
      <div className="text-left">
        <AlertDetailsDialog
          alert={row.original}
          trigger={
            <div className="font-medium cursor-pointer hover:text-blue-800 underline">
              {row.getValue('title')}
            </div>
          }
        />
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creation Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('date') as string | null;
      if (date === null) {
        return (
          <div className="px-4 py-2 flex items-center">
            <span>-</span>
          </div>
        );
      }
      return (
        <div className="px-4 py-2 flex items-center">
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => {
      console.log(row.original);
      const isActive = row.original.is_active;
      return (
        <div className="flex items-center px-8">
          {isActive ? (
            <Check className="w-5 h-5" />
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
                    <Archive className="mr-2 h-4 w-4 text-destructive" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <ArchiveRestore className="mr-2 h-4 w-4" />
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
