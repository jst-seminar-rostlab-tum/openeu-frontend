'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Archive,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Eye,
  Filter,
  Search,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import InboxOperations from '@/operations/inbox/InboxOperations';

// Define the inbox item type
type InboxItem = {
  id: string;
  title: string;
  date: string;
  country: string;
  relevanceScore: number;
};

export default function InboxPage() {
  const [data, setData] = useState<InboxItem[]>(InboxOperations.getInboxItems());
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    countries: [] as string[],
    relevanceRange: { min: 0, max: 100 },
    dateRange: { start: '', end: '' },
  });

  // Get unique countries for filter options
  const uniqueCountries = Array.from(new Set(data.map((item) => item.country)));

  // Handle country filter toggle
  const handleCountryFilter = (country: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      countries: checked
        ? [...prev.countries, country]
        : prev.countries.filter((c) => c !== country),
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      countries: [],
      relevanceRange: { min: 0, max: 100 },
      dateRange: { start: '', end: '' },
    });
    setColumnFilters([]);
    setGlobalFilter('');
  };

  // Check if any filters are active
  const hasActiveFilters = filters.countries.length > 0 || filters.relevanceRange.min > 0;

  // Action handlers
  const handleView = (itemId: string) => {
    alert(`Viewing item: ${itemId}`);
  };

  const handleArchive = (itemId: string) => {
    alert(`Archiving item: ${itemId}`);
  };

  const handleDelete = (itemId: string) => {
    setData((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Get relevance score color
  const getRelevanceColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Define columns
  const columns: ColumnDef<InboxItem>[] = [
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto p-0 font-semibold"
          >
            Title
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('title')}</div>
      ),
    },
    {
      accessorKey: 'date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto p-0 font-semibold"
          >
            Date
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('date')}</div>,
    },
    {
      accessorKey: 'country',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto p-0 font-semibold"
          >
            Country
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('country')}</div>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'relevanceScore',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto p-0 font-semibold justify-end"
          >
            Relevance Score
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
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
          <div className="flex items-center justify-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleView(item.id)}
              className="h-8 w-8 p-0"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleArchive(item.id)}
              className="h-8 w-8 p-0"
            >
              <Archive className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(item.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  // Filter data based on custom filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesCountry = filters.countries.length === 0 || filters.countries.includes(item.country);
      const matchesRelevance = item.relevanceScore >= filters.relevanceRange.min && item.relevanceScore <= filters.relevanceRange.max;
      return matchesCountry && matchesRelevance;
    });
  }, [data, filters]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
  });

  // Get selected items
  const selectedItems = table.getFilteredSelectedRowModel().rows.map(row => row.original.id);

  // Bulk actions
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
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Inbox Items</h1>

      {/* Search and Filter Component */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search inbox items..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="default"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
            {hasActiveFilters && (
              <span className="ml-1 bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs">
                Active
              </span>
            )}
            {showFilters ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>
        </div>

        {/* Filter Menu */}
        {showFilters && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
            <div className="space-y-6">
              {/* Country Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Country</Label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {uniqueCountries.map((country) => (
                    <div key={country} className="flex items-center space-x-4 whitespace-nowrap">
                      <Checkbox
                        id={`country-${country}`}
                        checked={filters.countries.includes(country)}
                        onCheckedChange={(checked) => handleCountryFilter(country, checked === true)}
                      />
                      <Label htmlFor={`country-${country}`} className="text-sm">
                        {country}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relevance Score Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Relevance Score</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      min="0"
                      max="100"
                      value={filters.relevanceRange.min}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          relevanceRange: {
                            ...prev.relevanceRange,
                            min: Number(e.target.value) || 0,
                          },
                        }))
                      }
                      className="w-20"
                    />
                    <span className="self-center">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      min="0"
                      max="100"
                      value={filters.relevanceRange.max}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          relevanceRange: {
                            ...prev.relevanceRange,
                            max: Number(e.target.value) || 100,
                          },
                        }))
                      }
                      className="w-20"
                    />
                  </div>
                </div>
              </div>

              {/* Date Range Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Date Range</Label>
                <div className="space-y-2">
                  <Input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, start: e.target.value },
                      }))
                    }
                  />
                  <Input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, end: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600">
                Showing {table.getFilteredRowModel().rows.length} of {data.length} items
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button variant="default" size="sm" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="mb-4 flex gap-2">
          <Button variant="outline" size="sm" onClick={handleBulkArchive}>
            <Archive className="h-4 w-4 mr-2" />
            Archive Selected ({selectedItems.length})
          </Button>
          <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected ({selectedItems.length})
          </Button>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
