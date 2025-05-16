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
