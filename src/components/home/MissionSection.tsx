'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';

export default function MissionSection() {
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true });

  return (
    <section
      ref={missionRef}
      className="py-24 bg-black dark:bg-gray-900 text-white"
    >
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={missionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Project Europe&apos;s Mission
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              In partnership with the EU Parliament, we are building the digital
              infrastructure for a transparent, efficient, and accessible
              European Union.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-white/20 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Transparency</h3>
              <p className="text-gray-400 dark:text-gray-500">
                Helps both individuals and businesses understand their
                compliance requirements
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-white/20 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Efficiency</h3>
              <p className="text-gray-400 dark:text-gray-500">
                Making EU compliance faster and easier.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-white/20 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Growth</h3>
              <p className="text-gray-400 dark:text-gray-500">
                Empowering European businesses to thrive in a compliant,
                competitive global market.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={missionInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-8"
          >
            <Button
              size="lg"
              className="text-lg px-8 bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              asChild
            >
              <Link href="/register">
                Sign Up <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Section>
    </section>
  );
}
