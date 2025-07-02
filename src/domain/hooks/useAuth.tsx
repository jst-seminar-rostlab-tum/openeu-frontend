'use client';

import { User } from '@supabase/supabase-js';
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

      // Handle different auth events
      switch (event) {
        case 'TOKEN_REFRESHED':
          if (process.env.NODE_ENV === 'development') {
            console.log('Token refreshed successfully');
          }
          break;

        case 'SIGNED_OUT':
          if (process.env.NODE_ENV === 'development') {
            console.log('User signed out');
          }
          // If user was previously authenticated and now signed out,
          // it might be due to refresh token expiration
          if (user && !session) {
            handleSessionExpiration();
          }
          break;

        case 'SIGNED_IN':
          if (process.env.NODE_ENV === 'development') {
            console.log('User signed in:', session?.user?.email);
          }
          break;

        default:
          if (process.env.NODE_ENV === 'development') {
            console.log('Auth state change:', event, session?.user?.email);
          }
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, MOCK_AUTH, initialUser]);

  const signOut = useCallback(async () => {
    setUser(null);

    const { error } = await supabase.auth.signOut();
    if (error) {
      ToastOperations.showError({
        title: 'Sign Out Failed',
        message:
          'Unable to sign out at this time. Please try again or refresh the page.',
      });
      setUser(initialUser);
    } else {
      router.push('/');
    }
  }, [supabase, router, initialUser]);

  const handleSessionExpiration = useCallback(() => {}, []);

  // Check for refresh token expiration (not access token expiration)
  useEffect(() => {
    const checkRefreshTokenExpiration = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        // If we can't get a session and there's an error, refresh token might be expired
        if (error || !data.session) {
          if (process.env.NODE_ENV === 'development') {
            console.log(
              'Session check failed, refresh token may be expired:',
              error,
            );
          }
          // Only show modal if user was previously authenticated
          if (user) {
            handleSessionExpiration();
          }
          return;
        }

        // If we have a session, refresh token is still valid
        if (process.env.NODE_ENV === 'development') {
          console.log('Session is valid, refresh token active');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // Only show modal if user was previously authenticated
        if (user) {
          handleSessionExpiration();
        }
      }
    };

    // Only check if user is authenticated
    if (user) {
      // Check every 10 minutes for refresh token expiration
      const interval = setInterval(checkRefreshTokenExpiration, 10 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [supabase, user, handleSessionExpiration]);

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
