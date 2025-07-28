'use client';

import { User } from '@supabase/supabase-js';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
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

  const token = getCookie('token') as string | undefined;

  // --- Cross-tab sign out sync ---
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'isGloballySigningOut' && event.newValue === 'true') {
        // Another tab triggered sign out, so do local cleanup
        setIsSigningOut(true);
        setUser(null);
        sessionStorage.removeItem('sessionExpiredToastShown');
        sessionStorage.removeItem('hadValidSession');
        // Optionally, redirect or refresh if on protected page
        const currentPath = window.location.pathname;
        const publicPages = [
          '/privacy',
          '/',
          '/login',
          '/register',
          '/forgot-password',
        ];
        const isPublicPage = publicPages.includes(currentPath);
        if (!isPublicPage) {
          router.push('/');
        } else if (currentPath === '/') {
          router.refresh();
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [router]);
  // --- End cross-tab sign out sync ---

  useEffect(() => {
    if (!token || isJwtExpired(token)) {
      // Only show toast if user had a valid session before (sessionStorage has 'hadValidSession' flag)
      const hadValidSession =
        sessionStorage.getItem('hadValidSession') === 'true';
      const toastAlreadyShown =
        sessionStorage.getItem('sessionExpiredToastShown') === 'true';
      const isGloballySigningOut =
        localStorage.getItem('isGloballySigningOut') === 'true';

      if (hadValidSession && !toastAlreadyShown && !isGloballySigningOut) {
        handleSessionExpiration();
        sessionStorage.setItem('sessionExpiredToastShown', 'true');
      }
      return;
    } else {
      // User has valid token, mark that they had a valid session
      sessionStorage.setItem('hadValidSession', 'true');
      sessionStorage.removeItem('sessionExpiredToastShown');
    }
  }, [token]);

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
      console.log(`[${new Date().toISOString()}]: event called`, event);
      setUser(session?.user ?? null);
      setLoading(false);

      switch (event) {
        case 'TOKEN_REFRESHED':
          if (process.env.NODE_ENV === 'development') {
            console.log('Token refreshed successfully');
          }
          if (session?.access_token) {
            console.log(
              `[${new Date().toISOString()}]: Token refreshed successfully`,
            );
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
            console.log(
              `[${new Date().toISOString()}]: Session expired, User signed out`,
            );
          }

          if (!isSigningOut) {
            console.log('handle sign out');
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
    if (isSigningOut || localStorage.getItem('isGloballySigningOut') === 'true')
      return;

    setIsSigningOut(true);
    setUser(null);
    localStorage.setItem('isGloballySigningOut', 'true');

    const { error } = await supabase.auth.signOut();
    if (error) {
      ToastOperations.showError({
        title: 'Sign Out Failed',
        message:
          'Unable to sign out at this time. Please try again or refresh the page.',
      });
      setUser(initialUser);
      setIsSigningOut(false);
      localStorage.removeItem('isGloballySigningOut');
    } else {
      deleteCookie('token', { path: '/' });
      deleteCookie('refresh_token', { path: '/' });
      sessionStorage.removeItem('sessionExpiredToastShown');
      sessionStorage.removeItem('hadValidSession');
      // Remove global sign out flag after a short delay to allow other tabs to sync
      setTimeout(() => {
        localStorage.removeItem('isGloballySigningOut');
      }, 500);

      const currentPath = window.location.pathname;
      const publicPages = [
        '/privacy',
        '/',
        '/login',
        '/register',
        '/forgot-password',
      ];
      const isPublicPage = publicPages.includes(currentPath);

      if (!isPublicPage) {
        router.push('/');
      } else if (currentPath === '/') {
        router.refresh();
      }
    }
  }, [supabase, router, initialUser, isSigningOut]);

  const handleSessionExpiration = useCallback(() => {
    const isGloballySigningOut =
      localStorage.getItem('isGloballySigningOut') === 'true';
    if (!isSigningOut && !isGloballySigningOut) {
      ToastOperations.showWarning({
        title: 'Session Expired',
        message:
          'Your session has expired for security reasons. You will be logged out automatically.',
      });
      console.log(`[${new Date().toISOString()}]: toast shown`);
      signOut();
    }
  }, [isSigningOut, signOut]);

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

export function isJwtExpired(token: string): boolean {
  try {
    const payload = jwtDecode(token);
    if (!payload.exp) return true;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}
