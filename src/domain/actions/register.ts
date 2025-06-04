'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

// Official Supabase recommended URL helper
function getURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.URL ?? // Automatically set by Netlify.
    process?.env?.VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';

  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Extract all form data
  const name = formData.get('name') as string;
  const surname = formData.get('surname') as string;
  const company = formData.get('company') as string;
  const country = formData.get('country') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: name.trim(),
        last_name: surname.trim(),
        company: company.trim(),
        country,
      },
      emailRedirectTo: `${getURL()}auth/confirm`,
    },
  });

  if (error) {
    redirect('/register?error=' + error.message);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
