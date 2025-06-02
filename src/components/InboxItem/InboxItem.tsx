import { Bookmark, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InboxItemProps } from '@/domain/entities/inbox-item/inbox-item';

export function InboxItem({
  regulation,
  isSelected,
  onSelect,
}: InboxItemProps) {
  return (
    <div className="border-b hover:bg-gray-50 transition-colors">
      <div className="grid grid-cols-12 gap-4 p-4 items-center text-sm">
        <div className="col-span-6 flex items-center space-x-3">
          <Checkbox checked={isSelected} onCheckedChange={onSelect} />
          <div>
            <span className="font-medium text-gray-900 text-left hover:text-blue-600">
              {regulation.title}
            </span>
          </div>
        </div>
        <div className="col-span-2 text-center text-gray-600">
          {regulation.date}
        </div>
        <div className="col-span-2 text-center text-gray-600">
          {regulation.country}
        </div>
        <div className="col-span-1 text-center">
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {regulation.relevanceScore}
          </span>
        </div>
        <div className="col-span-1 flex justify-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Set Alert</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
