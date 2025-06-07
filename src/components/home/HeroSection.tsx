'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-48px)] flex items-center justify-center overflow-hidden bg-black dark:bg-gray-900 text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-gray-800 dark:via-gray-900 dark:to-black" />

      <Section variant="noPadding" className="relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white">
                OpenEU
              </h1>
              <h2 className="text-2xl lg:text-4xl font-semibold text-gray-200">
                The Transparency Backbone for the European Union
              </h2>
              <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
                OpenEU transforms how organizations navigate EU regulations,
                ensuring compliance and transparency across all member states.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 bg-white text-black hover:bg-gray-100"
                asChild
              >
                <Link href="/register">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Bouncing Down Chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div
          className="cursor-pointer animate-bounce"
          onClick={() => {
            const nextSection = document.querySelector(
              'section:nth-of-type(2)',
            );
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown className="w-8 h-8 text-white/70 hover:text-white transition-colors" />
        </div>
      </motion.div>
    </section>
  );
}
