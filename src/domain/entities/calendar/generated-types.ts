import type { components } from '@/lib/api-types';

export type Topic = components['schemas']['Topic'];

export type Meeting = components['schemas']['Meeting'] & {
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange';
  meeting_end_datetime: string;
};

export type Member = {
  id: string;
  type: string;
  label: string;
  family_name: string;
  given_name: string;
  sort_label: string;
  country: string;
};
