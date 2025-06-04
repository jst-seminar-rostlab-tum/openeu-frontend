import { AlertCircleIcon } from 'lucide-react';

import { LoginForm } from '@/components/auth/LoginForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Page({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const error = decodeURIComponent(searchParams?.error || '');
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted">
      <div className="w-full max-w-sm">
        {error !== '' && (
          <div className="mb-10 shadow-sm rounded-xl">
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Sign in failed, please try again.</AlertTitle>
              <AlertDescription>
                <p>{decodeURIComponent(error)}</p>
              </AlertDescription>
            </Alert>
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
