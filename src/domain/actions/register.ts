'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Extract all form data
  const name = formData.get('name') as string;
  const surname = formData.get('surname') as string;
  const company = formData.get('company') as string;
  const country = formData.get('country') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Get the origin for email confirmation (works with Netlify PR previews)
  const headersList = await headers();
  const origin =
    headersList.get('origin') ||
    headersList.get('referer')?.replace(/\/$/, '') ||
    'http://localhost:3000';

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
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    console.error('Signup error:', error.message);
    redirect('/register?error=Registration failed');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
