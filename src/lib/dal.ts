import 'server-only';

import { cache } from 'react';

import { createClient } from '@/lib/supabase/server';

/**
 * Server-side authentication Data Access Layer (DAL).
 * Single source of truth for auth operations in server components/actions.
 * @module auth/dal
 */

/**
 * Gets current user without session validation.
 * @returns {Promise<User | null>} Current user or null
 * @example
 * const user = await getUser();
 * if (user) await fetchUserData(user.id);
 */
export const getUser = cache(async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
});

/**
 * Validates session and returns auth status with user.
 * Use for conditional auth checks without throwing.
 * @returns {Promise<{ isAuth: boolean; user: User | null }>}
 * @example
 * const { isAuth, user } = await verifySession();
 * return isAuth ? <AuthedView user={user} /> : <PublicView />;
 */
export const verifySession = cache(async () => {
  const user = await getUser();
  return user ? { isAuth: true, user } : null;
});

/**
 * Protected route/action guard.
 * @throws {AuthError} If not authenticated
 * @example
 * async function createPost() {
 *   await requireAuth();
 *   const user = await getUser(); // Guaranteed to exist
 * }
 */
export async function requireAuth() {
  const session = await verifySession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}
