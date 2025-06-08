import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import NavBar from '@/components/navigation/NavBar';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/domain/hooks/useAuth';
import { getUser } from '@/lib/dal';
import ReactQueryProvider from '@/lib/provider/ReactQueryProvider';
import { ThemeProvider } from '@/lib/provider/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpenEU',
  description:
    'The Transparency Backbone for the European Union using Agentic AI',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <AuthProvider initialUser={user}>
              <NavBar />
              <main className="mt-12 min-h-[calc(100vh-3rem)]">{children}</main>
              <Toaster />
            </AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
