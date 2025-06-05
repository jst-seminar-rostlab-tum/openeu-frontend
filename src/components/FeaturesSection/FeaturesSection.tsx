'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import CalendarFeature from '@/components/FeaturesSection/CalendarFeature';
import ChatFeature from '@/components/FeaturesSection/ChatFeature';
import InboxFeature from '@/components/FeaturesSection/InboxFeature';
import MapFeature from '@/components/FeaturesSection/MapFeature';

export default function FeaturesSection() {
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true });

  return (
    <section ref={featuresRef} className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-black dark:text-white">
            Experience OpenEU Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our comprehensive suite of tools designed to make EU
            compliance effortless and transparent for your business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl max-h-4xl mx-auto">
          {/* Calendar Feature */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <CalendarFeature />
          </motion.div>

          {/* Inbox Feature */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InboxFeature />
          </motion.div>

          {/* Chat Feature */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ChatFeature />
          </motion.div>

          {/* Map Feature */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <MapFeature />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
