import { getCookie } from 'cookies-next';

import {
  createNewAlert,
  deleteAlert,
  toggleAlertActive,
} from '@/domain/actions/alert-actions';
import { Alert } from '@/domain/entities/alerts/generated-types';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/alerts`;
export async function fetchBackendAlerts(userId: string): Promise<Alert[]> {
  const token = getCookie('token');

  try {
    const response = await fetch(
      `${API_URL}?user_id=${userId}&include_inactive=true`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      ToastOperations.showError({
        title: 'Error fetching alerts',
        message: 'Failed to fetch alerts. Please try again later.',
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res: Alert[] = await response.json();
    return res;
  } catch (error) {
    throw new Error(
      'Error fetching alerts: ' +
        (error instanceof Error ? error.message : 'Unknown error'),
    );
  }
}

export { createNewAlert, deleteAlert, toggleAlertActive };

export async function getMeetingsForAlert(alertId: string): Promise<Meeting[]> {
  const token = getCookie('token');
  const response = await fetch(`${API_URL}/${alertId}/meetings`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const res = await response.json();
  return res.data || [];
}
