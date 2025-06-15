import { Download } from 'lucide-react';
import { useState } from 'react';
import * as XLSX from 'xlsx';

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
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';

export default function ExportModal() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { meetings } = useMeetingContext() as { meetings: MeetingData[] };
  const handleExportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(meetings);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Meetings');
    XLSX.writeFile(workbook, 'meetings.xlsx');
    setDialogOpen(false);
  };

  const handleExportPDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const usableWidth = pageWidth - margin * 2;

    if (meetings.length === 0) {
      doc.setFontSize(10);
      doc.text('No data to export.', margin, 10);
    } else {
      const columns = Object.keys(meetings[0]).map((key) => ({
        header: key,
        dataKey: key as keyof MeetingData,
      }));
      const colCount = columns.length;
      const colWidth = usableWidth / colCount;

      autoTable(doc, {
        head: [columns.map((col) => col.header)],
        body: meetings.map((row) =>
          columns.map((col) => {
            const value = row[col.dataKey];
            return value === null ? '  ' : String(value);
          }),
        ),
        startY: 15,
        styles: { fontSize: 5, cellWidth: colWidth },
        headStyles: { fontSize: 5, cellWidth: colWidth },
        columnStyles: Object.fromEntries(
          columns.map((col, idx) => [idx, { cellWidth: colWidth }]),
        ),
        margin: { left: margin, right: margin },
        tableWidth: usableWidth,
      });
    }
    doc.save('meetings.pdf');
    setDialogOpen(false);
  };

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

          <Button onClick={handleExportXLSX}>Export as CSV</Button>
          <Button onClick={handleExportPDF}>Export as PDF</Button>
          <Button variant="destructive" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
