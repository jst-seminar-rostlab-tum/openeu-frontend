'use client';
import { Compass } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';

export default function InterestsForm() {
  const topics = [
    { label: 'Topic 1', value: 'Topic 1' },
    { label: 'Topic 2', value: 'Topic 2' },
    { label: 'Topic 3', value: 'Topic 3' },
    { label: 'Topic 4', value: 'Topic 4' },
  ];

  const countries = [
    { label: 'Germany', value: 'de' },
    { label: 'Spain', value: 'es' },
    { label: 'Austria', value: 'at' },
    { label: 'Belgium', value: 'be' },
    { label: 'Poland', value: 'pl' },
  ];

  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  return (
    <div className="grid gap-5 pt-3">
      <Card>
        <CardHeader>
          <div className="flex flex-row gap-2 align-text-center">
            <Compass />
            <h2 className="text-lg font-semibold">Interests</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium">Countries</Label>
              <MultiSelect
                options={countries}
                value={selectedCountries}
                onValueChange={setSelectedCountries}
                placeholder="Select countries"
                variant="inverted"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium">Topics</Label>
              <MultiSelect
                options={topics}
                value={selectedTopics}
                onValueChange={setSelectedTopics}
                placeholder="Select topics"
                variant="inverted"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button className="w-[8rem]">Save changes</Button>
      </div>
    </div>
  );
}
