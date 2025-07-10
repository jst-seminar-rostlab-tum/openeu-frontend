import type { components, operations } from '@/lib/api-types';

// === API TYPES (truly generated from backend) ===
export type Alert = components['schemas']['AlertResponse'];

// Extract the response type for the alerts endpoint
export type GetAlertsResponse =
  operations['get_alerts_endpoint_alerts_get']['responses']['200']['content']['application/json'];
