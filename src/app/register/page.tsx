import { AlertCircleIcon } from 'lucide-react';

import { RegisterForm } from '@/components/auth/RegisterForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default async function Page(props: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const searchParams = await props.searchParams;
  const error = decodeURIComponent(searchParams?.error || '');
  return (
    <div className="grid min-h-[calc(100vh-3rem)] lg:grid-cols-2">
      <div className="hidden lg:flex justify-center items-center sticky top-0 left-0">
        <div className="justify-center items-center flex flex-col">
          <h1 className="text-7xl mb-12 font-bold hover:text-accent-foreground transition-colors italic">
            OpenEU
          </h1>
          <p className="font-light text-lg text-center px-10">
            OpenEU transforms how citizens, businesses, and organizations engage
            with and participate in the EU, ensuring transparency and
            accessibility across all member states.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-muted">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {error !== '' && (
              <div className="mb-10">
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Sign up failed, please try again.</AlertTitle>
                  <AlertDescription>
                    <p>{error}</p>
                  </AlertDescription>
                </Alert>
              </div>
            )}
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
