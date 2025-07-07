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
  const { context, setContext } = useChatContext();
  const [searchValue, setSearchValue] = useState('');

  const handleLegislationSelect = (legislation: LegislativeFileSuggestion) => {
    setContext({
      type: 'legislation',
      id: legislation.id,
    });
  };

  return (
    <Dialog>
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
            Add or change context information to enhance your chat experience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {/* Current Context Section */}
          {context && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Current Context</h4>
              <ContextBadge id={context.id} />
            </div>
          )}

          {context && <Separator />}

          {/* Add/Change Legislation Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">
              {context
                ? 'Change Legislation Context'
                : 'Add Legislation Context'}
            </h4>
            <SuggestedSearch<LegislativeFileSuggestion>
              placeholder="Search for legislation by title or id..."
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
