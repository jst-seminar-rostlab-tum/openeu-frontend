'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import LoadingSpinner from '@/components/LoadingSpinner';
import { europeanCountries } from '@/components/map/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { signup } from '@/domain/actions/register';
import { useTopics } from '@/domain/hooks/topicHook';
import { cn } from '@/lib/utils';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const topics = useTopics();

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const countries = europeanCountries.map((country) => ({
    label: country,
    value: country,
  }));

  return (
    <form
      action={signup}
      onSubmit={() => setLoading(true)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign up to Project Europe</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            required
            disabled={loading}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="surname">Surname</Label>
          <Input
            id="surname"
            type="text"
            name="surname"
            required
            disabled={loading}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            type="text"
            name="company"
            required
            disabled={loading}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="company-description">Company Description</Label>
          <Input
            id="company-description"
            type="text"
            name="company-description"
            required
            disabled={loading}
          />
        </div>
        <div className="grid gap-3">
          <Label>Countries of interest</Label>
          <input
            type="hidden"
            value={selectedCountries.join(',')}
            name="country"
          />
          <MultiSelect
            options={countries}
            value={selectedCountries}
            onValueChange={setSelectedCountries}
            placeholder="Select countries"
            variant="inverted"
            disabled={loading}
          />
        </div>
        <div className="grid gap-3">
          <Label>Topics</Label>
          <MultiSelect
            options={
              topics.data?.map((option: { topic: string; id: string }) => ({
                label: option.topic,
                value: option.id,
              })) || []
            }
            value={selectedTopics}
            onValueChange={setSelectedTopics}
            placeholder="Select topics"
            variant="inverted"
            disabled={loading}
          />
        </div>
        <div className="grid gap-3 mt-10">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
            disabled={loading}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            required
            disabled={loading}
          />
        </div>
        <div className="overflow-x-auto">
          <Label htmlFor="newsletter-frequency">Newsletter</Label>
          <Select
            name="newsletter-frequency"
            defaultValue="daily"
            disabled={loading}
          >
            <SelectTrigger className="w-full mt-3">
              <SelectValue placeholder="Newsletter frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">
                Sign up for daily, personalized newsletter
              </SelectItem>
              <SelectItem value="weekly">
                Sign up for weekly, personalized newsletter
              </SelectItem>
              <SelectItem value="none">
                Do not sign up for newsletter
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? LoadingSpinner() : 'Sign up'}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  );
}
