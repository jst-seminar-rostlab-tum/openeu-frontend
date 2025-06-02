import { ChevronDown, ChevronUp, Filter, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Filters = {
  countries: string[];
  relevanceRange: { min: number; max: number };
  dateRange: { start: string; end: string };
};

type SearchAndFiltersProps = {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  uniqueCountries: string[];
  hasActiveFilters: boolean;
  totalItems: number;
  filteredItems: number;
};

export default function SearchAndFilters({
  globalFilter,
  setGlobalFilter,
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  uniqueCountries,
  hasActiveFilters,
  totalItems,
  filteredItems,
}: SearchAndFiltersProps) {
  const handleCountryFilter = (country: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      countries: checked
        ? [...prev.countries, country]
        : prev.countries.filter((c) => c !== country),
    }));
  };

  const clearFilters = () => {
    setFilters({
      countries: [],
      relevanceRange: { min: 0, max: 100 },
      dateRange: { start: '', end: '' },
    });
  };

  return (
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

      {showFilters && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <div className="space-y-6">
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

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {filteredItems} of {totalItems} items
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
  );
}
