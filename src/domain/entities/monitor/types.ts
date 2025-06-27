export type LegislationStatus =
  | 'commission-proposal'
  | 'committee-review'
  | 'parliament-first-reading'
  | 'council-first-reading'
  | 'parliament-second-reading'
  | 'council-second-reading'
  | 'conciliation'
  | 'adopted'
  | 'signed'
  | 'published'
  | 'withdrawn';

export type PoliticalGroup =
  | 'EPP'
  | 'S&D'
  | 'Renew'
  | 'Greens/EFA'
  | 'ECR'
  | 'ID'
  | 'Left';

export type Committee =
  | 'Environment, Climate and Food Safety'
  | 'Agriculture and Rural Development'
  | 'International Trade'
  | 'Fisheries'
  | 'Industry, Research and Energy'
  | 'Civil Liberties, Justice and Home Affairs'
  | 'Employment and Social Affairs'
  | 'Regional Development'
  | 'Economic and Monetary Affairs'
  | 'Public Health'
  | 'Legal Affairs'
  | 'Constitutional Affairs'
  | 'Transport and Tourism'
  | 'Internal Market and Consumer Protection'
  | 'Culture and Education'
  | "Women's Rights and Gender Equality"
  | 'Petitions'
  | 'Budgets'
  | 'Budgetary Control'
  | 'Development'
  | 'Foreign Affairs'
  | 'Security and Defence';

export type ProcedureType = 'COD' | 'CNS' | 'APP' | 'NLE' | 'DEA' | 'IMP';

export interface Rapporteur {
  name: string;
  group: PoliticalGroup;
}

export interface Legislation {
  id: string;
  title: string;
  committee?: Committee;
  rapporteurs: Rapporteur[];
  year: number;
  status: LegislationStatus;
  procedureType: ProcedureType;
  description?: string;
  submissionDate?: Date;
  lastUpdate?: Date;
  stage?: string;
}

export interface StatusInfo {
  name: string;
  color: string;
  description: string;
  symbol: string;
  order: number;
}

export type StatusConfig = Record<LegislationStatus, StatusInfo>;
