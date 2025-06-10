import { Notification } from '@/domain/entities/notifications/generated-types';

const API_URL = 'https://openeu-backend.onrender.com';

export async function fetchBackendNotifications(
  userId: string,
): Promise<Notification[]> {
  try {
    const response = await fetch(`${API_URL}/notifications/${userId}`);
    if (!response.ok) {
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
