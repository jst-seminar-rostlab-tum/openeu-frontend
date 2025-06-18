import { Download } from 'lucide-react';
import { useState } from 'react';

import { MotionButton } from '@/components/TooltipMotionButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { buttonHover } from '@/domain/animations';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import {
  handleExportPDF,
  handleExportXLSX,
} from '@/operations/meeting/ExportHelpers';

export default function ExportModal() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { meetings } = useMeetingContext();

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton
            variant="outline"
            onClick={() => setDialogOpen(true)}
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
          >
            <Download />
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent>
          <p>Export Data</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <DialogDescription>
              Choose the format to export your data.
            </DialogDescription>
          </DialogHeader>

          <Button onClick={() => handleExportXLSX(meetings, setDialogOpen)}>
            Export as Spreadsheet
          </Button>
          <Button onClick={() => handleExportPDF(meetings, setDialogOpen)}>
            Export as PDF
          </Button>
          <Button variant="destructive" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
