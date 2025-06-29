'use server';

import { setCookie } from 'cookies-next';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const authData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error, data } = await supabase.auth.signInWithPassword(authData);

  if (error) {
    redirect('/login?error=' + error.message);
  }

  if (data.session) {
    setCookie('token', data.session.access_token, { cookies });
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
