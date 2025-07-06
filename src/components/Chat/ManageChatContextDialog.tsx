'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { useChatContext } from '@/app/chat/ChatContext';
import { ContextBadge } from '@/components/Chat/ContextBadge';
import { SuggestedSearch } from '@/components/SuggestedSearch/SuggestedSearch';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { LegislativeFileSuggestion } from '@/domain/entities/monitor/generated-types';
import { legislationRepository } from '@/repositories/legislationRepository';

export function ManageChatContextDialog() {
  const { contexts, addContext } = useChatContext();
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleLegislationSelect = (legislation: LegislativeFileSuggestion) => {
    addContext({
      type: 'legislation',
      id: legislation.id,
      title: legislation.title,
    });
    setSearchValue(''); // Clear search after adding
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Manage chat context"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Chat Context</DialogTitle>
          <DialogDescription>
            Add or remove context information to enhance your chat experience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Contexts Section */}
          {contexts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Current Context</h4>
              <div className="space-y-2">
                {contexts.map((context) => (
                  <ContextBadge
                    key={`${context.type}-${context.id}`}
                    type={context.type}
                    id={context.id}
                  />
                ))}
              </div>
            </div>
          )}

          {contexts.length > 0 && <Separator />}

          {/* Add Legislation Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Add Legislation Context</h4>
            <SuggestedSearch<LegislativeFileSuggestion>
              placeholder="Search for legislation to add..."
              value={searchValue}
              onValueChange={setSearchValue}
              onSelect={handleLegislationSelect}
              fetchSuggestions={(query) =>
                legislationRepository.getLegislationSuggestions({
                  query,
                  limit: 5,
                })
              }
              getDisplayText={(legislation) => legislation.title}
              getSelectValue={(legislation) => legislation.title}
              suggestionsLabel="Legislation"
            />
            <p className="text-xs text-muted-foreground">
              Search and select legislation to add context to your conversation.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
