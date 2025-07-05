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
    return 'NA'; // Default for empty or undefined names
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
    text: 'text-blue-700 dark:text-blue-300',
    outline: 'border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-600 dark:bg-blue-500',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-700 dark:text-green-300',
    outline: 'border-green-200 dark:border-green-800',
    dot: 'bg-green-600 dark:bg-green-500',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950',
    text: 'text-purple-700 dark:text-purple-300',
    outline: 'border-purple-200 dark:border-purple-800',
    dot: 'bg-purple-600 dark:bg-purple-500',
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-950',
    text: 'text-yellow-700 dark:text-yellow-300',
    outline: 'border-yellow-200 dark:border-yellow-800',
    dot: 'bg-yellow-600 dark:bg-yellow-500',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-950',
    text: 'text-red-700 dark:text-red-300',
    outline: 'border-red-200 dark:border-red-800',
    dot: 'bg-red-600 dark:bg-red-500',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950',
    text: 'text-indigo-700 dark:text-indigo-300',
    outline: 'border-indigo-200 dark:border-indigo-800',
    dot: 'bg-indigo-600 dark:bg-indigo-500',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-950',
    text: 'text-pink-700 dark:text-pink-300',
    outline: 'border-pink-200 dark:border-pink-800',
    dot: 'bg-pink-600 dark:bg-pink-500',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-950',
    text: 'text-orange-700 dark:text-orange-300',
    outline: 'border-orange-200 dark:border-orange-800',
    dot: 'bg-orange-600 dark:bg-orange-500',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-950',
    text: 'text-teal-700 dark:text-teal-300',
    outline: 'border-teal-200 dark:border-teal-800',
    dot: 'bg-teal-600 dark:bg-teal-500',
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-950',
    text: 'text-cyan-700 dark:text-cyan-300',
    outline: 'border-cyan-200 dark:border-cyan-800',
    dot: 'bg-cyan-600 dark:bg-cyan-500',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950',
    text: 'text-violet-700 dark:text-violet-300',
    outline: 'border-violet-200 dark:border-violet-800',
    dot: 'bg-violet-600 dark:bg-violet-500',
  },
  fuchsia: {
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-950',
    text: 'text-fuchsia-700 dark:text-fuchsia-300',
    outline: 'border-fuchsia-200 dark:border-fuchsia-800',
    dot: 'bg-fuchsia-600 dark:bg-fuchsia-500',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950',
    text: 'text-rose-700 dark:text-rose-300',
    outline: 'border-rose-200 dark:border-rose-800',
    dot: 'bg-rose-600 dark:bg-rose-500',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950',
    text: 'text-amber-700 dark:text-amber-300',
    outline: 'border-amber-200 dark:border-amber-800',
    dot: 'bg-amber-600 dark:bg-amber-500',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950',
    text: 'text-emerald-700 dark:text-emerald-300',
    outline: 'border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-600 dark:bg-emerald-500',
  },
  sky: {
    bg: 'bg-sky-50 dark:bg-sky-950',
    text: 'text-sky-700 dark:text-sky-300',
    outline: 'border-sky-200 dark:border-sky-800',
    dot: 'bg-sky-600 dark:bg-sky-500',
  },
  lime: {
    bg: 'bg-lime-50 dark:bg-lime-950',
    text: 'text-lime-700 dark:text-lime-300',
    outline: 'border-lime-200 dark:border-lime-800',
    dot: 'bg-lime-600 dark:bg-lime-500',
  },
} as const;

// Backwards compatibility: legacy arrays for getColor function
const COLORS = Object.values(COLOR_SCHEMES).map(
  (scheme) => `${scheme.bg} ${scheme.text} ${scheme.outline}`,
);

const DOT_COLORS = Object.values(COLOR_SCHEMES).map((scheme) => scheme.dot);

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
 * Maps an ID to a consistent color style using deterministic hashing.
 * Same ID will always get the same color across renders and sessions.
 * @param id - ID to colorize (e.g., meeting ID)
 * @param variant - Color variant: 'bg' for colored backgrounds, 'dot' for dot indicators
 * @returns Tailwind CSS classes for the specified color variant
 */
export function getColorByHash(
  id: string,
  variant: 'bg' | 'dot' = 'bg',
): string {
  const hash = hashString(id);
  const colors = variant === 'dot' ? DOT_COLORS : COLORS;
  const colorIndex = hash % colors.length;
  return colors[colorIndex];
}

export function extractColorName(cssClassString: string): string {
  // Extract the first color name from the CSS class string
  const match = cssClassString.match(/bg-(\w+)-\d+/);
  return match ? match[1] : 'gray';
}

export function getStrokeColorClasses(colorName: string): {
  light: string;
  dark: string;
} {
  const lightClass = `stroke-${colorName}-200`;
  const darkClass = `stroke-${colorName}-800`;

  return {
    light: lightClass,
    dark: darkClass,
  };
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
