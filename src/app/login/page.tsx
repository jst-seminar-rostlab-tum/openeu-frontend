import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';

import { LoginForm } from '@/components/auth/LoginForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default async function Page(props: {
  searchParams?: Promise<{ error?: string; confirm?: string }>;
}) {
  const searchParams = await props.searchParams;
  const error = decodeURIComponent(searchParams?.error || '');
  const confirm = searchParams?.confirm || '';
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted">
      <div className="w-full max-w-sm">
        {error !== '' && (
          <div className="mb-10 shadow-sm rounded-xl">
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Sign in failed, please try again.</AlertTitle>
              <AlertDescription>
                <p>{error}</p>
              </AlertDescription>
            </Alert>
          </div>
        )}
        {confirm !== '' && (
          <div className="mb-10 shadow-sm rounded-xl">
            <Alert variant="default">
              <CheckCircleIcon />
              <AlertTitle>
                {confirm === '1' ? 'Sign up successful.' : 'Account activated.'}
              </AlertTitle>
              <AlertDescription>
                <p>
                  {confirm === '1'
                    ? 'Please confirm your address by clicking on the link in the E-Mail we just sent you. Afterwards you can login into your account.'
                    : 'Your account is now active. Please login with the credentials you provided during registration.'}
                </p>
              </AlertDescription>
            </Alert>
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
