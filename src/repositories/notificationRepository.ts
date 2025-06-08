import { InboxItem } from '@/domain/entities/inbox-item/inbox-item';

const API_URL = 'https://openeu-backend.onrender.com';

export async function fetchNotifications(userId: string): Promise<InboxItem[]> {
  try {
    const response = await fetch(`${API_URL}/notifications/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as InboxItem[];
  } catch (error) {
    throw new Error(
      'Error fetching notifications: ' +
        (error instanceof Error ? error.message : 'Unknown error'),
    );
  }
}
