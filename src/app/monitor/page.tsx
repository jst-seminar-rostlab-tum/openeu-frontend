'use client';

import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import { kanbanColumns } from '@/app/monitor/columns';
import { KanbanSkeleton } from '@/components/monitor/KanbanSkeleton';
import { TanStackKanban } from '@/components/monitor/MonitorKanban';
import { KanbanToolbar } from '@/components/monitor/MonitorToolbar';
import {
  useLegislativeFiles,
  useLegislativeUniqueValues,
} from '@/domain/hooks/legislative-hooks';
import ObservatoryOperations from '@/operations/monitor/MonitorOperations';

export default function ObservatoryPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState<
    string | undefined
  >();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();

  const {
    data: legislationData = [],
    isLoading,
    isFetching,
  } = useLegislativeFiles({
    query: searchValue || undefined,
    committee: selectedCommittee,
    year: selectedYear,
    user_id: selectedUserId,
  });

  const { data: uniqueValues } = useLegislativeUniqueValues();

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

  const processedData = table.getRowModel().rows.map((row) => row.original);

  const { groupedData, statusColumnsWithData } = useMemo(() => {
    const groupedData =
      ObservatoryOperations.groupLegislationByStatus(processedData);

    let orderedStatuses: string[] = [];

    if (uniqueValues?.statuses) {
      orderedStatuses = [...uniqueValues.statuses];

      if (groupedData['Other'] && !orderedStatuses.includes('Other')) {
        orderedStatuses.push('Other');
      }
    } else {
      orderedStatuses = Object.keys(groupedData).sort();
    }

    const statusColumnsWithData = orderedStatuses.filter(
      (status) => (groupedData[status]?.length || 0) > 0,
    );

    return { groupedData, statusColumnsWithData };
  }, [processedData, uniqueValues]);

  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (statusColumnsWithData.length > 0 && visibleColumns.size === 0) {
      setVisibleColumns(new Set(statusColumnsWithData));
    }
  }, [statusColumnsWithData, visibleColumns.size]);

  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col gap-3 p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end">
        <h1 className="text-2xl font-bold">Legislative Monitor</h1>
        <KanbanToolbar
          table={table}
          onSearchChange={setSearchValue}
          onCommitteeChange={setSelectedCommittee}
          onYearChange={setSelectedYear}
          onUserIdChange={setSelectedUserId}
          searchValue={searchValue}
          selectedCommittee={selectedCommittee}
          selectedYear={selectedYear}
          selectedUserId={selectedUserId}
          visibleColumns={visibleColumns}
          onVisibleColumnsChange={setVisibleColumns}
          statusColumnsWithData={statusColumnsWithData}
        />
      </div>
      {isFetching || isLoading ? (
        <KanbanSkeleton />
      ) : (
        <TanStackKanban
          groupedData={groupedData}
          className="flex-1"
          visibleColumns={visibleColumns}
          statusColumnsWithData={statusColumnsWithData}
        />
      )}
    </div>
  );
}
