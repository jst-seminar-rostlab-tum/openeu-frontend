import type { components } from '@/lib/api-types';

export type ProfileData = components['schemas']['ProfileCreate'];

export type ProfileUpdate = {
  name?: string;
  surname?: string;
  company_name?: string;
  company_description?: string;
  topic_list?: string[];
  subscribed_newsletter?: boolean;
};
