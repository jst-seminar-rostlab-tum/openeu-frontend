import { Alert } from '@/domain/entities/alerts/generated-types';

export type AlertTableItem = {
  id: string;
  title: string;
  date: string | null;
  is_active: boolean;
  description: string;
};

export interface AlertActions {
  onView?: (alert: AlertTableItem) => void;
  onTitleClick?: (alert: AlertTableItem) => void;
  onToggleActive: (alertId: string, active: boolean) => void;
  onViewMeetings?: (alert: AlertTableItem) => void;
}

export const mapAlertToTableItem = (alert: Alert): AlertTableItem => ({
  id: alert.id,
  title: alert.title ? alert.title.replace(/^"|"$/g, '') : alert.title,
  date: alert.created_at,
  is_active: alert.is_active,
  description: alert.description,
});
