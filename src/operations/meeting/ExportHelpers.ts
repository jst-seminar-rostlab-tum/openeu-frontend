import * as XLSX from 'xlsx';

import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { getMeetingType } from '@/operations/meeting/CalendarHelpers';

const filterMeetingsForExport = (meetings: MeetingData[]) =>
  meetings.map(
    ({
      color: _color,
      meeting_id: _meetingId,
      source_id: _sourceId,
      tags: _tags,
      similarity: _similarity,
      source_table: sourceTable,
      ...rest
    }) => ({
      ...rest,
      institution: getMeetingType(sourceTable),
    }),
  );

export const handleExportXLSX = (
  meetings: MeetingData[],
  setDialogOpen: (open: boolean) => void,
) => {
  const filteredMeetings = filterMeetingsForExport(meetings);
  const worksheet = XLSX.utils.json_to_sheet(filteredMeetings);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Meetings');
  XLSX.writeFile(workbook, 'meetings.xlsx');
  setDialogOpen(false);
};

export const handleExportPDF = async (
  meetings: MeetingData[],
  setDialogOpen: (open: boolean) => void,
) => {
  const { default: jsPDF } = await import('jspdf');
  const autoTable = (await import('jspdf-autotable')).default;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;
  const usableWidth = pageWidth - margin * 2;

  const filteredMeetings = filterMeetingsForExport(meetings);

  if (filteredMeetings.length === 0) {
    doc.setFontSize(10);
    doc.text('No data to export.', margin, 10);
  } else {
    const columns = Object.keys(filteredMeetings[0]).map((key) => ({
      header: key,
      dataKey: key as keyof (typeof filteredMeetings)[0],
    }));
    const colCount = columns.length;
    const colWidth = usableWidth / colCount;

    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: filteredMeetings.map((row) =>
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
