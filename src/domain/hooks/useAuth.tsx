'use client';

import { User } from '@supabase/supabase-js';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { createClient } from '@/lib/supabase/client';
import { ToastOperations } from '@/operations/toast/toastOperations';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  // 🚨 DEV ONLY: Mock authenticated user for testing
  const MOCK_AUTH = process.env.NODE_ENV === 'development' && false;

  useEffect(() => {
    if (MOCK_AUTH) {
      setUser({
        id: 'mock-user-id',
        email: 'test@example.com',
        aud: 'authenticated',
        app_metadata: {},
        user_metadata: {
          name: 'Test User',
          avatar_url: null,
        },
        created_at: new Date().toISOString(),
      } as User);
      setLoading(false);
      return () => {};
    }

    // Initialize with server-side user data
    setUser(initialUser);
    setLoading(false);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      switch (event) {
        case 'TOKEN_REFRESHED':
          if (process.env.NODE_ENV === 'development') {
            console.log('Token refreshed successfully');
          }
          if (session?.access_token) {
            console.log('Token refreshed successfully');
            // Save the refreshed token in cookies
            setCookie('token', session.access_token, {
              path: '/',
              secure: true,
              sameSite: 'strict',
            });
          }
          break;

        case 'SIGNED_OUT':
          if (process.env.NODE_ENV === 'development') {
            console.log('User signed out');
          }

          if (!isSigningOut) {
            handleSessionExpiration();
          }

          break;

        case 'INITIAL_SESSION':
        case 'SIGNED_IN':
          if (process.env.NODE_ENV === 'development') {
            console.log('User signed in:', session?.user?.email);
          }
          setIsSigningOut(false);
          break;

        default:
          if (process.env.NODE_ENV === 'development') {
            console.log('Auth state change:', event, session?.user?.email);
          }
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, MOCK_AUTH, initialUser, isSigningOut]);

  const signOut = useCallback(async () => {
    setIsSigningOut(true);
    setUser(null);

    const { error } = await supabase.auth.signOut();
    if (error) {
      ToastOperations.showError({
        title: 'Sign Out Failed',
        message:
          'Unable to sign out at this time. Please try again or refresh the page.',
      });
      setUser(initialUser);
      setIsSigningOut(false);
    } else {
      deleteCookie('token', { path: '/' });
      deleteCookie('refresh_token', { path: '/' });
      router.push('/');
    }
  }, [supabase, router, initialUser]);

  const handleSessionExpiration = useCallback(() => {
    ToastOperations.showWarning({
      title: 'Session Expired',
      message:
        'Your session has expired for security reasons. You will be logged out automatically.',
    });
    signOut();
  }, []);

  const contextValue = useMemo(
    () => ({ user, loading, signOut }),
    [user, loading, signOut],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

/**
 * Real-time client-side auth hook.
 * Use only in client components needing live auth updates.
 * Login/registration is handled via dedicated pages with server actions.
 * @returns {AuthContextType} Auth state and operations
 * @example
 * const { user, signOut } = useAuth();
 * return user ? <UserMenu onSignOut={signOut} /> : <LoginButton />;
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
