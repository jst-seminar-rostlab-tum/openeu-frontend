import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (typeof document !== 'undefined') {
            return document.cookie.split(';').map((cookie) => {
              const [name, value] = cookie.trim().split('=');
              return { name, value };
            });
          }
          return [];
        },
        setAll(cookiesToSet) {
          if (typeof document !== 'undefined') {
            cookiesToSet.forEach(({ name, value, options }) => {
              document.cookie = `${name}=${value}; path=/; ${
                options?.secure ? 'secure;' : ''
              } ${options?.sameSite ? `samesite=${options.sameSite};` : ''}`;
            });
          }
        },
      },
    },
  );
}
