import { getCookie } from 'cookies-next';

import { Notification } from '@/domain/entities/notifications/generated-types';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/notifications`;

export async function fetchBackendNotifications(
  userId: string,
): Promise<Notification[]> {
  const token = getCookie('token');

  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      ToastOperations.showError({
        title: 'Error fetching notifications',
        message: 'Failed to fetch notifications. Please try again later.',
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res: { data: Notification[] } = await response.json();
    return res.data;
  } catch (error) {
    throw new Error(
      'Error fetching notifications: ' +
        (error instanceof Error ? error.message : 'Unknown error'),
    );
  }
}
