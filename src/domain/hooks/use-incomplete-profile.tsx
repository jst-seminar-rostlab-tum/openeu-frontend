'use client';

import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { ToastOperations } from '@/operations/toast/toastOperations';

export function useIncompleteProfile(user: User | null) {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (user?.user_metadata['incompleteProfile'] && !hasShownToast.current) {
      const timer = setTimeout(() => {
        ToastOperations.showInfo({
          title: 'Finish your profile to unlock all features',
          message: (
            <p>
              <Link href="/profile">
                Click <b>here</b> to complete your profile.
              </Link>
            </p>
          ),
        });

        hasShownToast.current = true;
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      hasShownToast.current = false;
    }
  }, [user?.id]);
}
