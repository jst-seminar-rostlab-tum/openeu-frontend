'use client';

import { ReactNode, useState } from 'react';

import { AlertTableItem } from '@/app/inbox/alertTypes';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { ViewAlertMeetingsDialog } from './ViewAlertMeetingsDialog';

interface AlertDetailsDialogProps {
  alert: AlertTableItem | null;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AlertDetailsDialog({
  alert,
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: AlertDetailsDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled =
    controlledOpen !== undefined && controlledOnOpenChange !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const onOpenChange = isControlled
    ? controlledOnOpenChange!
    : setUncontrolledOpen;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <div onClick={() => onOpenChange(true)} style={{ display: 'inline' }}>
          {trigger}
        </div>
      )}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{alert?.title || 'Alert Details'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Description
            </Label>
            <p className="text-sm mt-1">
              {alert?.description || 'No description'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Title
              </Label>
              <p className="text-sm mt-1">{alert?.title || 'No title'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Status
              </Label>
              <p className="text-sm mt-1">
                {alert?.is_active ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Created
              </Label>
              <p className="text-sm mt-1">
                {alert?.date
                  ? new Date(alert.date).toLocaleDateString()
                  : 'Unknown'}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <ViewAlertMeetingsDialog alert={alert} triggerStyle="button" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
