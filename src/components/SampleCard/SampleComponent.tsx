'use client';

import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';

interface SampleComponentProps {
  email: string;
  data: { user: User } | { user: null };
}

function SampleComponent({ email, data }: SampleComponentProps) {
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <Card className="w-full mb-8 max-w-md border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
          You are logged in as {email}
        </CardTitle>
        <CardDescription className="text-gray-600">
          Use the link or button below to login/logout
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          This is additional content inside the card. You can customize it
          further.
        </p>
      </CardContent>
      <CardFooter>
        {!data?.user && <Link href="/login">Login</Link>}
        {data?.user && <Button onClick={() => signOut()}>Logout</Button>}
      </CardFooter>
    </Card>
  );
}

export default SampleComponent;
