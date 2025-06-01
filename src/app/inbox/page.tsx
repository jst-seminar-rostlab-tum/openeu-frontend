'use client';

import { Bookmark, Download, MessageSquare, Search } from 'lucide-react';
import { useState } from 'react';

import { InboxItem } from '@/components/InboxItem/InboxItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InboxOperations from '@/operations/inbox/InboxOperations';

export default function Home() {
  const inboxItems = InboxOperations.getInboxItems();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const toggleSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="col-span-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search regulations, directives, policies..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg border">
            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-100 font-medium text-sm text-gray-600">
              <div className="col-span-6">Title</div>
              <div className="col-span-2 text-center">Date</div>
              <div className="col-span-2 text-center">Country</div>
              <div className="col-span-1 text-center">Relevance</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>

            {inboxItems.map((InboxItemProps) => (
              <InboxItem
                key={InboxItemProps.id}
                regulation={InboxItemProps}
                isSelected={selectedItems.includes(InboxItemProps.id)}
                onSelect={() => toggleSelection(InboxItemProps.id)}
              />
            ))}

            {selectedItems.length > 0 && (
              <div className="p-4 border-t bg-white flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Selected: {selectedItems.length}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Contact Analyst
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-1" />
                    Save to Project
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export Selected
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
