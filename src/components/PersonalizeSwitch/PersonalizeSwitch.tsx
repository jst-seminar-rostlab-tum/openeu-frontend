import Link from 'next/link';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useProfile } from '@/domain/hooks/profileHooks';
import { useAuth } from '@/domain/hooks/useAuth';

export interface PersonalizeSwitchProps {
  onCheckedChange: (userId: string | undefined) => void;
  selectedUserId?: string;
  label?: string;
}

export default function PersonalizeSwitch({
  onCheckedChange,
  selectedUserId,
  label = 'Personalized',
}: PersonalizeSwitchProps) {
  const { user } = useAuth();
  const [hasProfile, setHasProfile] = useState(false);
  const [userId, setUserId] = useState('');
  const [checked, setChecked] = useState(false);
  const isInitialized = useRef(false);

  const { data: profile } = useProfile(userId);

  const handleSwitch = (isChecked: boolean) => {
    setChecked(isChecked);
    if (isChecked && hasProfile) {
      onCheckedChange(userId);
    } else {
      onCheckedChange(undefined);
    }
  };

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    setChecked(!!selectedUserId && selectedUserId === userId);
  }, [selectedUserId, userId]);

  useEffect(() => {
    if (
      userId &&
      profile &&
      !isInitialized.current &&
      profile.embedding_input
    ) {
      setHasProfile(true);
      isInitialized.current = true;
    }
  }, [userId, profile]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center justify-center gap-1">
          <Switch
            checked={checked}
            onCheckedChange={handleSwitch}
            disabled={!hasProfile}
          />
          <Label>{label}</Label>
        </div>
      </TooltipTrigger>
      {!hasProfile && (
        <TooltipContent>
          Complete{' '}
          <Link href="/profile" className="underline">
            profile
          </Link>{' '}
          to enable personalization
        </TooltipContent>
      )}
    </Tooltip>
  );
}
