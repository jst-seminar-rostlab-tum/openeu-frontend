'use client';

import { User } from '@supabase/supabase-js';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { createClient } from '@/lib/supabase/client';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // 🚨 DEV ONLY: Mock authenticated user for testing
  const MOCK_AUTH = process.env.NODE_ENV === 'development' && true; // Set to true to enable

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

    const getSession = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      setUser(authUser);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase, MOCK_AUTH]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
  }, [supabase]);

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
