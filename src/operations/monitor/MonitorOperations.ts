import { LegislativeFile } from '@/domain/entities/monitor/generated-types';
import {
  LegislationStatus,
  StatusConfig,
} from '@/domain/entities/monitor/types';

export default class MonitorOperations {
  static readonly statusConfig: StatusConfig = {
    'preparatory-phase-in-parliament': {
      name: 'Preparatory phase in Parliament',
      color: '#94a3b8',
      order: 1,
    },
    'awaiting-committee-decision': {
      name: 'Awaiting committee decision',
      color: '#f59e0b',
      order: 2,
    },
    'awaiting-parliament-position-1st-reading': {
      name: "Awaiting Parliament's position in 1st reading",
      color: '#3b82f6',
      order: 3,
    },
    'awaiting-parliament-vote': {
      name: "Awaiting Parliament's vote",
      color: '#8b5cf6',
      order: 4,
    },
    'awaiting-plenary-debate-vote': {
      name: 'Awaiting plenary debate/vote',
      color: '#f97316',
      order: 5,
    },
    'awaiting-final-decision': {
      name: 'Awaiting final decision',
      color: '#ef4444',
      order: 6,
    },
    'procedure-completed-awaiting-publication': {
      name: 'Procedure completed, awaiting publication in Official Journal',
      color: '#22c55e',
      order: 7,
    },
    'procedure-completed': {
      name: 'Procedure completed',
      color: '#15803d',
      order: 8,
    },
    'procedure-completed-delegated-act': {
      name: 'Procedure completed - delegated act enters into force',
      color: '#16a34a',
      order: 9,
    },
    'awaiting-parliament-position-draft-budget': {
      name: "Awaiting Parliament's position on the draft budget",
      color: '#0ea5e9',
      order: 10,
    },
    'procedure-rejected': {
      name: 'Procedure rejected',
      color: '#dc2626',
      order: 11,
    },
    Other: {
      name: 'Other',
      color: '#6b7280',
      order: 12,
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
