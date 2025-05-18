import '../styles/globals.css';

import type { Metadata } from 'next';
import React from 'react';

import NavBar from '@/components/navigation/NavBar';
import { ThemeProvider } from '@/components/ThemeProvider';

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

    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="pt-12">{children}</main>
        </ThemeProvider>
          </ReactQueryProvider>
      </body>
    </html>
  );
}
