'use client';

import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { useProfile } from '@/domain/hooks/profileHooks';
import { ToastOperations } from '@/operations/toast/toastOperations';

export function useIncompleteProfile(user: User | null) {
  const hasShownToast = useRef(false);
  const { data: profile, isLoading } = useProfile(user?.id || '', !!user?.id);

  useEffect(() => {
    if (user && !isLoading && profile === null && !hasShownToast.current) {
      const timer = setTimeout(() => {
        ToastOperations.showWarning({
          title: 'Finish your profile to unlock all features',
          message: (
            <Link href="/onboarding">
              Click <b>here</b> to complete your profile.
            </Link>
          ),
        });

        hasShownToast.current = true;
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [user, profile, isLoading]);

  useEffect(() => {
    if (!user) {
      hasShownToast.current = false;
    }
  }, [user?.id]);
}
