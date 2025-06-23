import * as React from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useAuth } from '@/domain/hooks/useAuth';

export default function PersonalizeSwitch() {
  const { setFilters, filters } = useMeetingContext();

  const { user } = useAuth();
  const handleSwitch = (checked: boolean) => {
    setFilters({
      ...filters,
      user_id: checked && user ? user.id : '',
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch defaultChecked={false} onCheckedChange={handleSwitch} />
      <Label>Personalized</Label>
    </div>
  );
}
