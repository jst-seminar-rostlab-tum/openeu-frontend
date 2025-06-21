'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Legislation } from '@/domain/entities/monitor/types';

export const kanbanColumns: ColumnDef<Legislation>[] = [
  // Only define actual data columns for sorting
  {
    accessorKey: 'title',
    id: 'title',
    header: 'Title',
    enableSorting: true,
  },
  {
    accessorKey: 'year',
    id: 'year',
    header: 'Year',
    enableSorting: true,
  },
  {
    accessorKey: 'submissionDate',
    id: 'submissionDate',
    header: 'Submission Date',
    enableSorting: true,
  },
  {
    accessorKey: 'lastUpdate',
    id: 'lastUpdate',
    header: 'Last Update',
    enableSorting: true,
  },
  {
    accessorKey: 'committee',
    id: 'committee',
    header: 'Committee',
    enableSorting: true,
  },
  {
    accessorKey: 'procedureType',
    id: 'procedureType',
    header: 'Procedure Type',
    enableSorting: true,
  },
];
