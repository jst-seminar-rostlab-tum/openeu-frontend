'use client';

import { ColumnDef } from '@tanstack/react-table';

import { LegislativeFile } from '@/domain/entities/monitor/generated-types';
import MonitorOperations from '@/operations/monitor/MonitorOperations';

export const kanbanColumns: ColumnDef<LegislativeFile>[] = [
  {
    accessorKey: 'title',
    id: 'title',
    header: 'Title',
    enableSorting: true,
  },
  {
    accessorKey: 'id',
    id: 'year',
    header: 'Year',
    enableSorting: true,
    accessorFn: (row) => {
      return MonitorOperations.extractYearFromId(row.id);
    },
  },
  {
    accessorKey: 'lastpubdate',
    id: 'lastpubdate',
    header: 'Last Publication Date',
    enableSorting: true,
  },
  {
    accessorKey: 'committee',
    id: 'committee',
    header: 'Committee',
    enableSorting: true,
  },
  {
    accessorKey: 'rapporteur',
    id: 'rapporteur',
    header: 'Rapporteur',
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    enableSorting: true,
  },
  {
    accessorKey: 'subjects',
    id: 'subjects',
    header: 'Subjects',
    enableSorting: true,
  },
  {
    accessorKey: 'key_players',
    id: 'key_players',
    header: 'Key Players',
    enableSorting: true,
  },
  {
    accessorKey: 'key_events',
    id: 'key_events',
    header: 'Key Events',
    enableSorting: true,
  },
  {
    accessorKey: 'documentation_gateway',
    id: 'documentation_gateway',
    header: 'Documentation',
    enableSorting: true,
  },
  {
    accessorKey: 'similarity',
    id: 'similarity',
    header: 'Similarity',
    enableSorting: true,
  },
];
