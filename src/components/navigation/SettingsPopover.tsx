'use client';

import { Monitor, Moon, Settings, Shield, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function SettingsPopover() {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 flex flex-col gap-1">
        <h3 className="font-medium">Settings</h3>
        <Separator />
        <Button variant="ghost" size="sm" className="justify-start" asChild>
          <Link href="/privacy">
            <Shield className="h-4 w-4" />
            Privacy Policy
          </Link>
        </Button>
        <Separator />
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Theme</p>
          <ToggleGroup
            type="single"
            size="sm"
            value={theme}
            variant="outline"
            onValueChange={(value) => {
              if (value && value !== theme) {
                setTheme(value);
              }
            }}
            className="w-full"
          >
            <ToggleGroupItem value="light" aria-label="Light theme">
              <Sun className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Dark theme">
              <Moon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="system" aria-label="System theme">
              <Monitor className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
