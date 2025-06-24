'use client';

import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { kanbanColumns } from '@/app/monitor/columns';
import { TanStackKanban } from '@/components/monitor/MonitorKanban';
import { KanbanToolbar } from '@/components/monitor/MonitorToolbar';
import ObservatoryOperations from '@/operations/monitor/MonitorOperations';

export default function ObservatoryPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState<
    string | undefined
  >();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(ObservatoryOperations.getStatusOrder()),
  );

  const legislationData = ObservatoryOperations.getLegislationData();

  const table = useReactTable({
    data: legislationData,
    columns: kanbanColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    autoResetPageIndex: false,
    enableMultiSort: true,
    state: {
      sorting,
    },
  });

  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col gap-3 p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end">
        <h1 className="text-2xl font-bold">Legislative Monitor</h1>
        <KanbanToolbar
          table={table}
          onSearchChange={setSearchValue}
          onCommitteeChange={setSelectedCommittee}
          onYearChange={setSelectedYear}
          searchValue={searchValue}
          selectedCommittee={selectedCommittee}
          selectedYear={selectedYear}
          visibleColumns={visibleColumns}
          onVisibleColumnsChange={setVisibleColumns}
        />
      </div>
      <TanStackKanban
        table={table}
        className="flex-1"
        visibleColumns={visibleColumns}
      />
    </div>
  );
}
