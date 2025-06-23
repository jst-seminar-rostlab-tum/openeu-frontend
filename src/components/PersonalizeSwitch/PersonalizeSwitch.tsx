import * as React from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useAuth } from '@/domain/hooks/useAuth';

export default function PersonalizeSwitch() {
  const { setFilters, filters } = useMeetingContext();
  const { user } = useAuth();

  const hasProfile = user?.user_metadata['incompleteProfile'];

  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (hasProfile) {
      setFilters({
        ...filters,
        user_id: user?.id,
      });
      setChecked(true);
    }
  }, [filters, hasProfile, setFilters, user?.id]);

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
