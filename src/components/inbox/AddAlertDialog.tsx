'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { ToastOperations } from '@/operations/toast/toastOperations';
import { createNewAlert } from '@/repositories/alertRepository';

interface AddAlertDialogProps {
  userId: string;
}

export function AddAlertDialog({ userId }: AddAlertDialogProps) {
  const [alertDescription, setAlertDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createNewAlert({
        user_id: userId,
        description: alertDescription,
      });
      ToastOperations.showSuccess({
        title: 'Alert Created',
        message: 'Your alert was successfully created.',
      });
      setAlertDescription('');
      queryClient.invalidateQueries({ queryKey: ['alerts', userId] });
    } catch (error) {
      ToastOperations.showError({
        title: 'Error Creating Alert',
        message: 'Failed to create alert. Please try again.',
      });
      console.error('Error creating alert:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit" size="sm">
          {' '}
          Add new alert
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new alert</DialogTitle>
          <DialogDescription>
            Describe what you want to be alerted for in a conversational manner.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="alert-description">Description</Label>
            <Textarea
              id="alert-description"
              placeholder="e.g. Notify me about new EU digital regulations"
              value={alertDescription}
              onChange={(e) => setAlertDescription(e.target.value)}
              className="resize-y min-h-16"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  size="small"
                  className="mr-2 text-gray-500 opacity-100 [&>svg]:stroke-2"
                  show={true}
                />{' '}
              </>
            ) : (
              '🔔 Add alert'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
