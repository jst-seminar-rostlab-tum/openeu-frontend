import '../styles/globals.css';

import type { Metadata } from 'next';
import React from 'react';

import { ThemeProvider } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

import ReactQueryProvider from './ReactQueryProvider';

export const metadata: Metadata = {
  title: 'OpenEU',
  description:
    'The Transparency Backbone for the European Union using Agentic AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn('min-h-screen bg-background font-sans antialiased')}
      >
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
