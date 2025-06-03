'use server';

import { revalidateTag } from 'next/cache';

import {
  ChatSession,
  CreateSessionRequest,
} from '@/domain/entities/chat/ChatSession';
import { requireAuth } from '@/lib/dal';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://openeu-backend.onrender.com';

export async function createChatSession(
  data: Omit<CreateSessionRequest, 'user_id'>,
): Promise<ChatSession> {
  try {
    // Require authentication and get user
    const { user } = await requireAuth();

    const requestData: CreateSessionRequest = {
      ...data,
      user_id: user.id, // Use real authenticated user ID
    };

    console.log('Creating chat session with data:', {
      ...requestData,
      user_id: '[REDACTED]', // Don't log actual user ID
    });
    console.log('API endpoint:', `${API_BASE_URL}/chat/start`);

    const response = await fetch(`${API_BASE_URL}/chat/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    console.log('Response status:', response.status);
    console.log(
      'Response headers:',
      Object.fromEntries(response.headers.entries()),
    );

    if (!response.ok) {
      // Get the response text for better error debugging
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });

      throw new Error(
        `Failed to create session: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const session = await response.json();
    console.log('Session created successfully:', session);

    // Revalidate the sessions cache
    revalidateTag(`chat-sessions-${user.id}`);

    return session;
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
}
