import { setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// The client you created from the Server-Side Auth instructions
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/';
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/';
  }

  if (code) {
    const supabase = await createClient();
    const {
      data: { user, session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('id', user?.id);

      if (!count) {
        await supabase.auth.updateUser({ data: { incompleteProfile: true } });
      }

      if (session) {
        await supabase.auth.updateUser({
          data: {
            oauthRefreshToken: session.provider_refresh_token,
            oauthAccessToken: session.provider_token,
          },
        });
        setCookie('token', session.access_token, { cookies });
      }

      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
