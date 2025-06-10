/**
 * Auto-generated notification types extracted from OpenAPI specification
 * Run `yarn run api:update` to regenerate
 *
 * Backend API: https://openeu-backend.onrender.com/docs#/notifications/get_notifications_for_user_notifications__user_id__get
 */

// Import the auto-generated types
import type { components, operations } from '@/lib/api-types';

// === API TYPES (truly generated from backend) ===
export type Notification = components['schemas']['Notification'];

// Extract the response type for the notifications endpoint
export type GetNotificationsResponse =
  operations['get_notifications_for_user_notifications__user_id__get']['responses']['200']['content']['application/json'];
