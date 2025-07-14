'use server';

import { setCookie } from 'cookies-next';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { LoginFormData, RegisterFormData } from '@/domain/schemas/auth';
import { createClient } from '@/lib/supabase/server';

async function getCurrentURL() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';
  return `${protocol}://${host}/`;
}

export async function signup(formData: RegisterFormData) {
  const supabase = await createClient();
  const url = await getCurrentURL();

  const { error, data } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        first_name: formData.name.trim(),
        last_name: formData.surname.trim(),
      },
      emailRedirectTo: `${url}auth/confirm`,
    },
  });

  if (error) {
    redirect('/register?error=' + error.message);
  }

  if (data.session) {
    setCookie('token', data.session.access_token, { cookies });
  }

  revalidatePath('/', 'layout');
  redirect('/login?confirm=1');
}

export async function login(formData: LoginFormData) {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    redirect('/login?error=' + error.message);
  }

  if (data.session) {
    setCookie('token', data.session.access_token, { cookies });
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
