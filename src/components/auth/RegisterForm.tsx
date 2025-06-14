'use client';

import { Radio, RadioGroup } from '@headlessui/react';
import Link from 'next/link';
import React, { useState } from 'react';

import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { signup } from '@/domain/actions/register';
import { cn } from '@/lib/utils';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const topics = [
    { name: 'Topic 1' },
    { name: 'Topic 2' },
    { name: 'Topic 3' },
    { name: 'Topic 4' },
  ];

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [newsletterSignup, setNewsletterSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [redraw, setRedraw] = useState(false);

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
            options={[
              { label: 'Germany', value: 'de' },
              { label: 'Spain', value: 'es' },
              { label: 'Austria', value: 'at' },
              { label: 'Belgium', value: 'be' },
              { label: 'Poland', value: 'pl' },
            ]}
            value={selectedCountries}
            onValueChange={setSelectedCountries}
            placeholder="Select countries"
            variant="inverted"
            disabled={loading}
          />
        </div>
        <div className="hidden gap-3">
          <Label>Topics</Label>
          <input type="hidden" value={selectedTopics.join(',')} name="topics" />
          <RadioGroup
            disabled={loading}
            value={selectedTopics}
            onChange={(v) => {
              const temp = selectedTopics;
              // @ts-expect-error wrong type provided by lib
              if (temp.includes(v)) {
                // @ts-expect-error wrong type provided by lib
                const index = temp.indexOf(v);
                temp.splice(index, 1);
              } else {
                // @ts-expect-error wrong type provided by lib
                temp.push(v);
              }
              setSelectedTopics(temp);
              setRedraw(!redraw);
            }}
            className="mt-2 grid grid-cols-3 gap-3"
          >
            {topics.map((option: { name: string }) => (
              <Radio
                key={option.name}
                value={option.name}
                className={cn(
                  'cursor-pointer focus:outline-none flex items-center justify-center rounded-md px-3 py-3 text-sm ring-1 ring-gray-300 hover:bg-gray-50 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-primary data-[focus]:ring-offset-2 sm:flex-1 [&:not([data-focus])]:[&:not([data-checked])]:ring-inset',
                  selectedTopics.includes(option.name)
                    ? ' bg-primary text-white ring-0 hover:bg-primary'
                    : '',
                )}
              >
                {option.name}
              </Radio>
            ))}
          </RadioGroup>
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
        <div className="grid gap-3">
          <div className="flex flex-row gap-2 items-center">
            <input
              type="hidden"
              value={newsletterSignup ? 'true' : 'false'}
              name="subscribed-newsletter"
            />
            <Checkbox
              id="newsletter"
              checked={newsletterSignup}
              onCheckedChange={(checked) => {
                setNewsletterSignup(!!checked);
                return checked;
              }}
              disabled={loading}
            />
            <Label htmlFor="newsletter" className="text-sm font-normal">
              Signup for daily, personalized newsletter
            </Label>
          </div>
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
