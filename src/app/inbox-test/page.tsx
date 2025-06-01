'use client';

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

export default function InboxTestPage() {
  const [inboxItems, setInboxItems] = useState(InboxOperations.getInboxItems());
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [filters, setFilters] = useState({
    countries: [] as string[],
    relevanceRange: { min: 0, max: 100 },
    dateRange: { start: '', end: '' },
  });

  // Get unique countries for filter options
  const uniqueCountries = Array.from(
    new Set(inboxItems.map((item) => item.country)),
  );

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
  };

  // Check if any filters are active
  const hasActiveFilters = filters.countries.length > 0 || filters.relevanceRange.min > 0;

  // Handle individual checkbox selection
  const handleItemSelect = (itemId: string, checked: boolean | string) => {
    const isChecked = checked === true || checked === 'indeterminate';
    if (isChecked) {
      setSelectedItems((prev) => [...prev, itemId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    }
  };

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean | string) => {
    const isChecked = checked === true || checked === 'indeterminate';
    if (isChecked) {
      setSelectedItems(filteredItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Action handlers
  const handleView = (itemId: string) => {
    console.log(`Viewing item: ${itemId}`);
    // Replace with your actual view logic
  };

  const handleArchive = (itemId: string) => {
    console.log(`Archiving item: ${itemId}`);
    // Replace with your actual archive logic
  };

  const handleDelete = (itemId: string) => {
    setInboxItems((prev) => prev.filter((item) => item.id !== itemId));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  // Bulk actions
  const handleBulkArchive = () => {
    console.log(`Archiving ${selectedItems.length} items`);
    setSelectedItems([]);
  };

  const handleBulkDelete = () => {
    setInboxItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.id)),
    );
    setSelectedItems([]);
  };

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get relevance score color
  const getRelevanceColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Sort and filter items
  const sortedAndFilteredItems = useMemo(() => {
    const filtered = inboxItems.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      item.country.toLowerCase().includes(searchTerm.toLowerCase());
      item.date.includes(searchTerm);

      const matchesCountry = filters.countries.length === 0;
      filters.countries.includes(item.country);
      const matchesRelevance =        item.relevanceScore >= filters.relevanceRange.min;

      return matchesSearch && matchesCountry && matchesRelevance;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key as keyof typeof a];
        let bValue = b[sortConfig.key as keyof typeof b];

        // Handle date sorting
        if (sortConfig.key === 'date') {
          aValue = new Date(aValue as string).getTime();
          bValue = new Date(bValue as string).getTime();
        }

        // Handle relevance score sorting
        if (sortConfig.key === 'relevanceScore') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [inboxItems, searchTerm, filters, sortConfig]);

  // Update filteredItems reference
  const filteredItems = sortedAndFilteredItems;

  // Get sort icon for column headers
  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <Label className="text-sm font-medium mb-2 block">
                  Country
                </Label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {uniqueCountries.map((country) => (
                    <div
                      key={country}
                      className="flex items-center space-x-4 whitespace-nowrap"
                    >
                      <Checkbox
                        id={`country-${country}`}
                        checked={filters.countries.includes(country)}
                        onCheckedChange={(checked) =>
                          handleCountryFilter(country, checked === true)
                        }
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
                <Label className="text-sm font-medium mb-2 block">
                  Relevance Score
                </Label>
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
                <Label className="text-sm font-medium mb-2 block">
                  Date Range
                </Label>
                <div className="space-y-2">
                  <Input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, start: e.target.value },
                      }))}
                  />
                  <Input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, end: e.target.value },
                      }))}
                  />
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600">
                Showing {filteredItems.length} of {inboxItems.length} items
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={
                  selectedItems.length === filteredItems.length
                  && filteredItems.length > 0
                }
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleSort('title')}
            >
              <div className="flex items-center gap-2">
                Title
                {getSortIcon('title')}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleSort('date')}
            >
              <div className="flex items-center gap-2">
                Date
                {getSortIcon('date')}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleSort('country')}
            >
              <div className="flex items-center gap-2">
                Country
                {getSortIcon('country')}
              </div>
            </TableHead>
            <TableHead
              className="text-right cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleSort('relevanceScore')}
            >
              <div className="flex items-center justify-end gap-2">
                Relevance Score
                {getSortIcon('relevanceScore')}
              </div>
            </TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={(checked) =>
                    handleItemSelect(item.id, checked)}
                  aria-label={`Select ${item.title}`}
                />
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.country}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span>{item.relevanceScore}%</span>
                  <div
                    className={`w-2 h-2 rounded-full ${getRelevanceColor(
                      item.relevanceScore,
                    )}`}
                    style={{
                      opacity: 0.75,
                    }}
                  />
                </div>
              </TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No items found matching your search criteria.
        </div>
      )}
    </div>
  );
}
