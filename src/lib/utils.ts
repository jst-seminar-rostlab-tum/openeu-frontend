import { User } from '@supabase/supabase-js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts initials from a name.
 * For a single name, returns the first two characters.
 * For multiple names, returns the first character of the first and last names.
 * @param name The full name to extract initials from
 * @returns The extracted initials (maximum 2 characters)
 */
export function extractInitials(name?: string): string {
  if (!name || name.trim() === '') {
    return 'N/A'; // Default for empty or undefined names
  }

  const nameParts = name.trim().split(/\s+/);

  if (nameParts.length === 1) {
    // For a single name, return first two characters (or one if only one character)
    return nameParts[0].substring(0, 2).toUpperCase();
  }

  // Get first character of first and last name
  const firstInitial = nameParts[0].charAt(0);
  const lastInitial = nameParts[nameParts.length - 1].charAt(0);

  return (firstInitial + lastInitial).toUpperCase();
}

export const COLOR_SCHEMES = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    accent: 'bg-blue-100 dark:bg-blue-900',
    text: 'text-blue-700 dark:text-blue-300',
    outline: 'border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-600 dark:bg-blue-500',
    stroke: 'stroke-blue-300 dark:stroke-blue-600',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-950',
    accent: 'bg-green-100 dark:bg-green-900',
    text: 'text-green-700 dark:text-green-300',
    outline: 'border-green-200 dark:border-green-800',
    dot: 'bg-green-600 dark:bg-green-500',
    stroke: 'stroke-green-300 dark:stroke-green-600',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950',
    accent: 'bg-purple-100 dark:bg-purple-900',
    text: 'text-purple-700 dark:text-purple-300',
    outline: 'border-purple-200 dark:border-purple-800',
    dot: 'bg-purple-600 dark:bg-purple-500',
    stroke: 'stroke-purple-300 dark:stroke-purple-600',
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-950',
    accent: 'bg-yellow-100 dark:bg-yellow-900',
    text: 'text-yellow-700 dark:text-yellow-300',
    outline: 'border-yellow-200 dark:border-yellow-800',
    dot: 'bg-yellow-600 dark:bg-yellow-500',
    stroke: 'stroke-yellow-300 dark:stroke-yellow-600',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-950',
    accent: 'bg-red-100 dark:bg-red-900',
    text: 'text-red-700 dark:text-red-300',
    outline: 'border-red-200 dark:border-red-800',
    dot: 'bg-red-600 dark:bg-red-500',
    stroke: 'stroke-red-300 dark:stroke-red-600',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950',
    accent: 'bg-indigo-100 dark:bg-indigo-900',
    text: 'text-indigo-700 dark:text-indigo-300',
    outline: 'border-indigo-200 dark:border-indigo-800',
    dot: 'bg-indigo-600 dark:bg-indigo-500',
    stroke: 'stroke-indigo-300 dark:stroke-indigo-600',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-950',
    accent: 'bg-pink-100 dark:bg-pink-900',
    text: 'text-pink-700 dark:text-pink-300',
    outline: 'border-pink-200 dark:border-pink-800',
    dot: 'bg-pink-600 dark:bg-pink-500',
    stroke: 'stroke-pink-300 dark:stroke-pink-600',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-950',
    accent: 'bg-orange-100 dark:bg-orange-900',
    text: 'text-orange-700 dark:text-orange-300',
    outline: 'border-orange-200 dark:border-orange-800',
    dot: 'bg-orange-600 dark:bg-orange-500',
    stroke: 'stroke-orange-300 dark:stroke-orange-600',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-950',
    accent: 'bg-teal-100 dark:bg-teal-900',
    text: 'text-teal-700 dark:text-teal-300',
    outline: 'border-teal-200 dark:border-teal-800',
    dot: 'bg-teal-600 dark:bg-teal-500',
    stroke: 'stroke-teal-300 dark:stroke-teal-600',
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-950',
    accent: 'bg-cyan-100 dark:bg-cyan-900',
    text: 'text-cyan-700 dark:text-cyan-300',
    outline: 'border-cyan-200 dark:border-cyan-800',
    dot: 'bg-cyan-600 dark:bg-cyan-500',
    stroke: 'stroke-cyan-300 dark:stroke-cyan-600',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950',
    accent: 'bg-violet-100 dark:bg-violet-900',
    text: 'text-violet-700 dark:text-violet-300',
    outline: 'border-violet-200 dark:border-violet-800',
    dot: 'bg-violet-600 dark:bg-violet-500',
    stroke: 'stroke-violet-300 dark:stroke-violet-600',
  },
  fuchsia: {
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-950',
    accent: 'bg-fuchsia-100 dark:bg-fuchsia-900',
    text: 'text-fuchsia-700 dark:text-fuchsia-300',
    outline: 'border-fuchsia-200 dark:border-fuchsia-800',
    dot: 'bg-fuchsia-600 dark:bg-fuchsia-500',
    stroke: 'stroke-fuchsia-300 dark:stroke-fuchsia-600',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950',
    accent: 'bg-rose-100 dark:bg-rose-900',
    text: 'text-rose-700 dark:text-rose-300',
    outline: 'border-rose-200 dark:border-rose-800',
    dot: 'bg-rose-600 dark:bg-rose-500',
    stroke: 'stroke-rose-300 dark:stroke-rose-600',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950',
    accent: 'bg-amber-100 dark:bg-amber-900',
    text: 'text-amber-700 dark:text-amber-300',
    outline: 'border-amber-200 dark:border-amber-800',
    dot: 'bg-amber-600 dark:bg-amber-500',
    stroke: 'stroke-amber-300 dark:stroke-amber-600',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950',
    accent: 'bg-emerald-100 dark:bg-emerald-900',
    text: 'text-emerald-700 dark:text-emerald-300',
    outline: 'border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-600 dark:bg-emerald-500',
    stroke: 'stroke-emerald-300 dark:stroke-emerald-600',
  },
  sky: {
    bg: 'bg-sky-50 dark:bg-sky-950',
    accent: 'bg-sky-100 dark:bg-sky-900',
    text: 'text-sky-700 dark:text-sky-300',
    outline: 'border-sky-200 dark:border-sky-800',
    dot: 'bg-sky-600 dark:bg-sky-500',
    stroke: 'stroke-sky-300 dark:stroke-sky-600',
  },
  lime: {
    bg: 'bg-lime-50 dark:bg-lime-950',
    accent: 'bg-lime-100 dark:bg-lime-900',
    text: 'text-lime-700 dark:text-lime-300',
    outline: 'border-lime-200 dark:border-lime-800',
    dot: 'bg-lime-600 dark:bg-lime-500',
    stroke: 'stroke-lime-300 dark:stroke-lime-600',
  },
} as const;

export type ColorSchemeKey = keyof typeof COLOR_SCHEMES;

/**
 * Generates a consistent hash for any string using FNV-1a algorithm.
 * Ensures same input always produces same hash for consistent UI behavior.
 * @param str - Input string to hash
 * @returns Unsigned 32-bit hash value
 */
function hashString(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash +=
      (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

/**
 * Maps an ID to a consistent color key using deterministic hashing.
 * Same ID will always get the same color across renders and sessions.
 * @param id - ID to colorize (e.g., meeting ID)
 * @returns ColorSchemeKey for the specified ID
 */
export function getColorKeyByHash(id: string): ColorSchemeKey {
  const hash = hashString(id);
  const colorKeys = Object.keys(COLOR_SCHEMES) as ColorSchemeKey[];
  const colorIndex = hash % colorKeys.length;
  return colorKeys[colorIndex];
}

/**
 * Extracts the first name from a Supabase user object.
 * Falls back to the username part of email if no first name is available.
 * @param user - Supabase User object
 * @returns First name or email username
 */
export function getFirstName(user: User): string {
  if (user?.user_metadata?.first_name) {
    return user.user_metadata.first_name;
  }
  return user?.email?.split('@')[0] || '';
}

/**
 * Extracts the full display name from a Supabase user object.
 * Combines first and last name if available, otherwise falls back to email username.
 * @param user - Supabase User object
 * @returns Full display name or email username
 */
export function getDisplayName(user: User): string {
  const firstName = user.user_metadata?.first_name as string;
  const lastName = user.user_metadata?.last_name as string;

  if (firstName && lastName) {
    return `${firstName.trim()} ${lastName.trim()}`;
  }

  if (firstName) {
    return firstName.trim();
  }

  return user?.email?.split('@')[0] || 'User';
}

export function getWeekKey(date: Date): string {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return `${d.getUTCFullYear()}-W${weekNo}`;
}

export function b64EncodeUnicode(str: string) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(Number('0x' + p1));
    }),
  );
}
