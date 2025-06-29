'use client';

import { AlertTriangle } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SessionExpirationModalProps {
  open: boolean;
  onLogout: () => void;
}

export function SessionExpirationModal({
  open,
  onLogout,
}: SessionExpirationModalProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Session Expired
          </DialogTitle>
          <DialogDescription>
            Your session has expired for security reasons. You need to log in
            again to continue using the application.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button variant="destructive" onClick={onLogout}>
            Log Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
