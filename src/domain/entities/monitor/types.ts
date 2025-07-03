export type LegislationStatus =
  | 'preparatory-phase-in-parliament'
  | 'awaiting-committee-decision'
  | 'awaiting-parliament-position-1st-reading'
  | 'awaiting-parliament-vote'
  | 'awaiting-plenary-debate-vote'
  | 'awaiting-final-decision'
  | 'procedure-completed-awaiting-publication'
  | 'procedure-completed'
  | 'procedure-completed-delegated-act'
  | 'awaiting-parliament-position-draft-budget'
  | 'procedure-rejected'
  | 'Other';

export interface StatusInfo {
  name: string;
  color: string;
  order: number;
}

export type StatusConfig = Record<LegislationStatus, StatusInfo>;
