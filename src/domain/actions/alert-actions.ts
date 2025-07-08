'use server';

import { cookies } from 'next/headers';

import { Alert } from '@/domain/entities/alerts/generated-types';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/alerts`;

export async function createNewAlert(params: {
  user_id: string;
  description: string;
}): Promise<Alert> {
  const token = (await cookies()).get('token')?.value;
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    ToastOperations.showError({
      title: 'Error creating alert',
      message: 'Failed to create alert. Please try again later.',
    });
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function deleteAlert(alertId: string): Promise<void> {
  const token = (await cookies()).get('token')?.value;
  const response = await fetch(`${API_URL}/${alertId}`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    ToastOperations.showError({
      title: 'Error deleting alert',
      message: 'Failed to delete alert. Please try again later.',
    });
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export async function toggleAlertActive(
  alertId: string,
  active: boolean,
): Promise<void> {
  const token = (await cookies()).get('token')?.value;
  const response = await fetch(`${API_URL}/${alertId}?active=${active}`, {
    method: 'PATCH',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    ToastOperations.showError({
      title: 'Error updating alert',
      message: 'Failed to update alert. Please try again later.',
    });
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
