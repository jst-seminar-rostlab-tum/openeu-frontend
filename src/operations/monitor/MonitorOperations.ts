import { LegislativeFile } from '@/domain/entities/monitor/generated-types';

export default class MonitorOperations {
  static groupLegislationByStatus(
    data: LegislativeFile[],
  ): Record<string, LegislativeFile[]> {
    return data.reduce(
      (acc, item) => {
        const status = item.status || 'Other';
        (acc[status] ??= []).push(item);
        return acc;
      },
      {} as Record<string, LegislativeFile[]>,
    );
  }

  static extractYearFromId(id: string): number | null {
    const match = id.match(/^(\d{4})\//);
    return match ? parseInt(match[1], 10) : null;
  }
}
