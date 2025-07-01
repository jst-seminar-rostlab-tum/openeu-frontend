'use client';

import { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Link from 'next/link';

import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { useIncompleteProfile } from '@/domain/hooks/use-incomplete-profile';
import { getFirstName } from '@/lib/utils';

interface LoggedInLandingProps {
  user: User;
}

export default function LoggedInLanding({ user }: LoggedInLandingProps) {
  const firstName = getFirstName(user);

  useIncompleteProfile(user);

  return (
    <main className="min-h-[calc(100vh-48px)] bg-white dark:bg-black text-black dark:text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-white to-slate-200 dark:from-gray-900 dark:via-black dark:to-gray-800" />

      <Section className="relative z-10 px-4" variant="screenCentered">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 w-full"
        >
          {/* Greeting */}
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Welcome back, <span className="capitalize">{firstName}</span>!
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Ready to engage with the EU? Choose your tool to get started.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button asChild variant="outline">
              <Link href="/privacy">
                <Shield className="w-4 h-4" />
                Privacy Policy
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Section>
    </main>
  );
}
