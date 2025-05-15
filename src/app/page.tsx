import SampleComponent from '@/components/SampleCard/SampleComponent';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  let email: string;
  if (error || !data?.user) {
    email = 'Guest';
  } else {
    email = data.user.email || '';
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-300">
        Welcome to OpenEU, {email} 👋
      </h1>
      <SampleComponent
        title="Sample Card Title"
        description="This is a description for the sample card."
      />
      <ThemeToggle />
    </main>
  );
}
