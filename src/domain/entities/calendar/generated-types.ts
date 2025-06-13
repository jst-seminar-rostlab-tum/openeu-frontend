import type { components } from '@/lib/api-types';

export type Meeting = components['schemas']['Meeting'] & {
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange';
};
