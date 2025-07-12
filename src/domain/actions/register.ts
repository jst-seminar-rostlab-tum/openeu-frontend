'use server';

import { setCookie } from 'cookies-next';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createProfile } from '@/domain/actions/profile';
import { ProfileCreate } from '@/domain/entities/profile/generated-types';
import { createClient } from '@/lib/supabase/server';

async function getCurrentURL() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';
  return `${protocol}://${host}/`;
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Extract all form data
  const name = formData.get('name') as string;
  const surname = formData.get('surname') as string;
  const company = formData.get('company') as string;
  const companyDescription = formData.get('company-description') as string;
  let country = formData.get('country') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const topics = formData.get('topics') as string;
  const newsletterFrequency = formData.get(
    'newsletter-frequency',
  ) as ProfileCreate['newsletter_frequency'];
  const url = await getCurrentURL();

  if (country.split(',').length === 0 || country === '') {
    country = 'de,es,at,be,pl';
  }

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: name.trim(),
        last_name: surname.trim(),
        company: company.trim(),
        country,
      },
      emailRedirectTo: `${url}auth/confirm`,
    },
  });

  if (error) {
    redirect('/register?error=' + error.message);
  }

  if (data.user) {
    await createProfile({
      id: data.user.id,
      name: name,
      surname: surname,
      user_type: 'entrepreneur',
      company: {
        role: '',
        name: company,
        description: companyDescription,
        company_stage: '',
        company_size: 0,
        industry: '',
      },
      topic_ids: topics.split(','),
      countries: country.split(','),
      newsletter_frequency: newsletterFrequency,
    });
  }
  if (data.session) {
    setCookie('token', data.session.access_token, { cookies });
  }

  revalidatePath('/', 'layout');
  redirect('/login?confirm=1');
}
