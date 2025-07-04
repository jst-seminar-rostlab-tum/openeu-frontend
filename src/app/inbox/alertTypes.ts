import { Alert } from '@/domain/entities/alerts/generated-types';

export type AlertTableItem = {
  id: string;
  title: string;
  date: string | null;
  relevanceScore: number;
  is_active: boolean;
};

export interface AlertActions {
  onView: (alert: AlertTableItem) => void;
  onTitleClick: (alert: AlertTableItem) => void;
  onToggleActive: (alertId: string, active: boolean) => void;
}

export const mapAlertToTableItem = (alert: Alert): AlertTableItem => ({
  id: alert.id,
  title: alert.title ? alert.title.replace(/^"|"$/g, '') : alert.title,
  date: alert.created_at,
  relevanceScore: alert.relevancy_threshold,
  is_active: alert.is_active,
});
