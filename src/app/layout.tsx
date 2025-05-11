import '../styles/globals.css';

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'OpenEU',
  description: 'Minimal Tailwind + Next.js App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
