export type Alert = {
  id: string;
  title?: string;
  description: string;
  created_at: string | null;
  relevancy_threshold: number;
  is_active: boolean;
};

export type AlertTableItem = {
  id: string;
  title: string;
  date: string | null;
  is_active: boolean;
  description: string;
};

export interface AlertActions {
  onView?: (alert: AlertTableItem) => void;
  onToggleActive: (alertId: string, active: boolean) => void;
}

export const mapAlertToTableItem = (alert: Alert): AlertTableItem => ({
  id: alert.id,
  title: alert.title ? alert.title.replace(/^"|"$/g, '') : '',
  date: alert.created_at,
  is_active: alert.is_active,
  description: alert.description,
});
