import { createClient } from '@/lib/supabase/client';

export async function loginWithGoogle() {
  const supabase = await createClient();
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}
