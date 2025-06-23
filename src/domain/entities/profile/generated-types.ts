import type { components } from '@/lib/api-types';

export type ProfileData = components['schemas']['ProfileCreate'];

export type ProfileUpdate = Partial<Omit<ProfileData, 'id'>>;
