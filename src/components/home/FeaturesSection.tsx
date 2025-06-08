'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import CalendarFeature from '@/components/home/features/CalendarFeature';
import ChatFeature from '@/components/home/features/ChatFeature';
import InboxFeature from '@/components/home/features/InboxFeature';
import MapFeature from '@/components/home/features/MapFeature';
import { Section } from '@/components/section';

export default function FeaturesSection() {
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: '0px 0px -100px 0px',
  });

  return (
    <section ref={featuresRef} className="py-16 bg-white dark:bg-black">
      <Section className="text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black dark:text-white">
            Experience OpenEU Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our comprehensive suite of tools designed to make EU
            engagement accessible and transparent for everyone.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CalendarFeature />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <InboxFeature />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ChatFeature />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <MapFeature />
          </motion.div>
        </div>
      </Section>
    </section>
  );
}
