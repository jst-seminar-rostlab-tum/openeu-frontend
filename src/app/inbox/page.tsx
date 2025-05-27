'use client';

import { Bookmark, Download, MessageSquare, Search } from 'lucide-react';
import { useState } from 'react';

import { InboxItem } from '@/components/InboxItem/InboxItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Sample data for notifications with simplified structure
const regulations = [
  {
    id: '1',
    title: 'Digital Markets Act Amendment',
    date: 'May 14, 2025',
    country: 'EU-wide',
    relevanceScore: 95,
  },
  {
    id: '2',
    title: 'Data Privacy Framework Update',
    date: 'May 12, 2025',
    country: 'EU-wide',
    relevanceScore: 88,
  },
  {
    id: '3',
    title: 'Green Energy Transition Directive',
    date: 'May 10, 2025',
    country: 'EU-wide',
    relevanceScore: 82,
  },
  {
    id: '4',
    title: 'Financial Services Reporting Standards',
    date: 'May 8, 2025',
    country: 'EU-wide',
    relevanceScore: 79,
  },
  {
    id: '5',
    title: 'German AI Ethics Framework',
    date: 'May 7, 2025',
    country: 'Germany',
    relevanceScore: 76,
  },
  {
    id: '6',
    title: 'French Digital Services Tax Revision',
    date: 'May 5, 2025',
    country: 'France',
    relevanceScore: 74,
  },
  {
    id: '7',
    title: 'EU Cybersecurity Certification Scheme',
    date: 'May 3, 2025',
    country: 'EU-wide',
    relevanceScore: 71,
  },
  {
    id: '8',
    title: 'Spanish Renewable Energy Incentives',
    date: 'May 1, 2025',
    country: 'Spain',
    relevanceScore: 68,
  },
  {
    id: '9',
    title: 'Italian Data Localization Requirements',
    date: 'April 28, 2025',
    country: 'Italy',
    relevanceScore: 65,
  },
  {
    id: '10',
    title: 'EU Artificial Intelligence Act Implementation',
    date: 'April 25, 2025',
    country: 'EU-wide',
    relevanceScore: 92,
  },
  {
    id: '11',
    title: 'Swedish Environmental Reporting Standards',
    date: 'April 22, 2025',
    country: 'Sweden',
    relevanceScore: 61,
  },
  {
    id: '12',
    title: 'Dutch Digital Identity Framework',
    date: 'April 20, 2025',
    country: 'Netherlands',
    relevanceScore: 58,
  },
];

export default function Home() {
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

            {regulations.map((regulation) => (
              <InboxItem
                key={regulation.id}
                regulation={regulation}
                isSelected={selectedItems.includes(regulation.id)}
                onSelect={() => toggleSelection(regulation.id)}
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
