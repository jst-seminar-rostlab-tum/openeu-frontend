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

// Tag color utilities
const TAG_COLORS = [
  'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
  'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
  'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
  'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800',
  'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
  'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
  'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800',
  'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800',
  'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800',
  'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800',
  'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800',
  'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950 dark:text-fuchsia-300 dark:border-fuchsia-800',
  'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
  'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800',
  'bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-950 dark:text-lime-300 dark:border-lime-800',
];

// Dot color utilities for calendar events
const TAG_DOT_COLORS = [
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-blue-600 dark:[&_svg]:fill-blue-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-green-600 dark:[&_svg]:fill-green-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-purple-600 dark:[&_svg]:fill-purple-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-yellow-600 dark:[&_svg]:fill-yellow-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-red-600 dark:[&_svg]:fill-red-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-indigo-600 dark:[&_svg]:fill-indigo-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-pink-600 dark:[&_svg]:fill-pink-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-orange-600 dark:[&_svg]:fill-orange-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-teal-600 dark:[&_svg]:fill-teal-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-cyan-600 dark:[&_svg]:fill-cyan-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-violet-600 dark:[&_svg]:fill-violet-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-fuchsia-600 dark:[&_svg]:fill-fuchsia-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-rose-600 dark:[&_svg]:fill-rose-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-amber-600 dark:[&_svg]:fill-amber-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-emerald-600 dark:[&_svg]:fill-emerald-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-sky-600 dark:[&_svg]:fill-sky-500',
  'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-lime-600 dark:[&_svg]:fill-lime-500',
];

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
export function getColor(id: string, variant: 'bg' | 'dot' = 'bg'): string {
  const hash = hashString(id);
  const colors = variant === 'dot' ? TAG_DOT_COLORS : TAG_COLORS;
  const colorIndex = hash % colors.length;
  return colors[colorIndex];
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
