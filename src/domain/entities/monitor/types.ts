export type LegislationStatus =
  | 'Preparatory phase in Parliament'
  | 'Awaiting committee decision'
  | "Awaiting Parliament's position in 1st reading"
  | "Awaiting Parliament's vote"
  | 'Awaiting plenary debate/vote'
  | 'Awaiting final decision'
  | 'Procedure completed, awaiting publication in Official Journal'
  | 'Procedure completed'
  | 'Procedure completed - delegated act enters into force'
  | "Awaiting Parliament's position on the draft budget"
  | 'Procedure rejected'
  | 'Other';

export interface StatusInfo {
  color: string;
}

export type StatusConfig = Record<LegislationStatus, StatusInfo>;
