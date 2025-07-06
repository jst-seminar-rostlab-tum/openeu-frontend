import { LegislativeFile } from '@/domain/entities/monitor/generated-types';
import {
  LegislationStatus,
  StatusConfig,
} from '@/domain/entities/monitor/types';

export default class MonitorOperations {
  static readonly statusConfig: StatusConfig = {
    'Preparatory phase in Parliament': {
      color: '#94a3b8',
    },
    'Awaiting committee decision': {
      color: '#f59e0b',
    },
    "Awaiting Parliament's position in 1st reading": {
      color: '#3b82f6',
    },
    "Awaiting Parliament's vote": {
      color: '#8b5cf6',
    },
    'Awaiting plenary debate/vote': {
      color: '#f97316',
    },
    'Awaiting final decision': {
      color: '#ef4444',
    },
    'Procedure completed, awaiting publication in Official Journal': {
      color: '#22c55e',
    },
    'Procedure completed': {
      color: '#15803d',
    },
    'Procedure completed - delegated act enters into force': {
      color: '#16a34a',
    },
    "Awaiting Parliament's position on the draft budget": {
      color: '#0ea5e9',
    },
    'Procedure rejected': {
      color: '#dc2626',
    },
    Other: {
      color: '#6b7280',
    },
  };

  static groupLegislationByStatus(
    data: LegislativeFile[],
  ): Record<LegislationStatus, LegislativeFile[]> {
    return data.reduce(
      (acc, item) => {
        const status = (item.status || 'Other') as LegislationStatus;
        (acc[status] ??= []).push(item);
        return acc;
      },
      {} as Record<LegislationStatus, LegislativeFile[]>,
    );
  }

  static getUniqueCommittees(data: LegislativeFile[]): string[] {
    return [
      ...new Set(
        data.map((item) => item.committee).filter((c): c is string => !!c),
      ),
    ];
  }

  static getUniqueYears(data: LegislativeFile[]): number[] {
    return [
      ...new Set(
        data
          .map((item) => this.extractYearFromId(item.id))
          .filter((y): y is number => y !== null),
      ),
    ].sort((a, b) => b - a);
  }

  static extractYearFromId(id: string): number | null {
    const match = id.match(/^(\d{4})\//);
    return match ? parseInt(match[1], 10) : null;
  }
}
