import * as React from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useProfile } from '@/domain/hooks/profileHooks';
import { useAuth } from '@/domain/hooks/useAuth';

export default function PersonalizeSwitch() {
  const { setFilters, filters } = useMeetingContext();
  const { user } = useAuth();

  const { data: profile } = useProfile(user?.id);
  const hasProfile = !!profile;
  const [checked, setChecked] = React.useState(true);

  React.useEffect(() => {
    if (hasProfile && user?.id) {
      setFilters({
        ...filters,
        user_id: user.id,
      });
    }
  }, [hasProfile, user?.id]);

  const handleSwitch = (checked: boolean) => {
    setChecked(checked);
    setFilters({
      ...filters,
      user_id: checked && hasProfile ? user?.id : '',
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={checked}
        onCheckedChange={handleSwitch}
        disabled={!hasProfile}
      />
      <Label>Personalized</Label>
    </div>
  );
}
