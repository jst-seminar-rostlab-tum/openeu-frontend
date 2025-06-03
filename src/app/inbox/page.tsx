'use client';

import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DataTableToolbar } from '@/components/Inbox/data-table-toolbar';
import { Section } from '@/components/section';
import InboxOperations from '@/operations/inbox/InboxOperations';

import { createColumns, InboxItem } from './columns';
import { DataTable } from './data-table';

export default function InboxPage() {
  const [data, setData] = useState<InboxItem[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Initialize data
  useEffect(() => {
    setData(InboxOperations.getInboxItems());
  }, []);

  // Get unique countries for filter options
  const uniqueCountries = Array.from(new Set(data.map((item) => item.country)));

  // Action handlers
  const handleView = useCallback((itemId: string) => {
    alert(`Viewing item: ${itemId}`);
  }, []);

  const handleArchive = useCallback((itemId: string) => {
    alert(`Archiving item: ${itemId}`);
  }, []);

  const handleDelete = useCallback((itemId: string) => {
    setData((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const columns = useMemo(
    () =>
      createColumns({
        onView: handleView,
        onArchive: handleArchive,
        onDelete: handleDelete,
      }),
    [handleView, handleArchive, handleDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      rowSelection,
      columnVisibility,
    },
  });

  const selectedItems = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original.id);

  const handleBulkArchive = () => {
    alert(`Archiving ${selectedItems.length} items`);
    setRowSelection({});
  };

  const handleBulkDelete = () => {
    const selectedIds = selectedItems;
    setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setRowSelection({});
  };

  return (
    <Section>
      <h1 className='text-2xl font-bold'>Inbox</h1>
      <div className='space-y-4'>
        <DataTableToolbar
          table={table}
          uniqueCountries={uniqueCountries}
          onBulkArchive={handleBulkArchive}
          onBulkDelete={handleBulkDelete}
        />
        <DataTable table={table} columns={columns} />
      </div>
    </Section>
  );
}
