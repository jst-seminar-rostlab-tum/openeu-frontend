'use client';

import { User } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { SessionExpirationModal } from '@/components/auth/SessionExpirationModal';
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
  const [showSessionExpirationModal, setShowSessionExpirationModal] =
    useState(false);
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

      if (event === 'TOKEN_REFRESHED' && session?.access_token) {
        console.log('Token refreshed successfully');
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Auth state change:', event, session?.user?.email);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, MOCK_AUTH, initialUser]);

  const signOut = useCallback(async () => {
    setUser(null);
    setShowSessionExpirationModal(false);

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

  const handleSessionExpiration = useCallback(() => {
    setShowSessionExpirationModal(true);
  }, []);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;

        if (token) {
          const payload = jwtDecode(token);

          if (!payload || !payload.exp) {
            handleSessionExpiration();
            return;
          }

          const expiration = payload.exp * 1000;
          const now = Date.now();

          if (expiration <= now) {
            if (process.env.NODE_ENV === 'development') {
              console.log('Token expired, showing session expiration modal');
            }
            handleSessionExpiration();
          } else {
            const timeout = expiration - now;
            if (process.env.NODE_ENV === 'development') {
              console.log(
                `Token expires in ${Math.round(timeout / 1000 / 60)} minutes`,
              );
            }
            setTimeout(() => handleSessionExpiration(), timeout);
          }
        }
      } catch (error) {
        console.error('Error checking token expiration:', error);
        handleSessionExpiration();
      }
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [supabase, handleSessionExpiration]);

  const contextValue = useMemo(
    () => ({ user, loading, signOut }),
    [user, loading, signOut],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <SessionExpirationModal
        open={showSessionExpirationModal}
        onLogout={signOut}
      />
    </AuthContext.Provider>
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
