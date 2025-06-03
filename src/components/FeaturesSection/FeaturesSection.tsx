'use client';

import { motion, useInView } from 'framer-motion';
import { Bell, Search } from 'lucide-react';
import { useRef, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function FeaturesSection() {
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true });

  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, title: 'New GDPR Amendment', country: 'EU-Wide', urgent: true },
    {
      id: 2,
      title: 'Digital Services Act Update',
      country: 'Germany',
      urgent: false,
    },
    { id: 3, title: 'AI Regulation Draft', country: 'France', urgent: true },
  ]);

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
            Try our core features that make EU compliance effortless and
            transparent.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Search Component */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-2 border-black dark:border-white bg-white dark:bg-gray-900">
              <CardHeader className="text-center border-b border-gray-200 dark:border-gray-700">
                <div className="mx-auto w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-white dark:text-black" />
                </div>
                <CardTitle className="text-2xl text-black dark:text-white">
                  AI-Powered Search
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Find relevant EU regulations instantly with contextual AI
                  search
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Search for GDPR, AI Act, Digital Services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-12 border-black dark:border-white focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>

                  <div className="space-y-2">
                    {searchQuery && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                          <div className="font-medium text-black dark:text-white">
                            General Data Protection Regulation (GDPR)
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            EU-wide • Updated 2 days ago
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                          <div className="font-medium text-black dark:text-white">
                            Digital Services Act Implementation
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Germany • New requirements
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Search through 50,000+ documents in seconds
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications Component */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-2 border-black dark:border-white bg-white dark:bg-gray-900">
              <CardHeader className="text-center border-b border-gray-200 dark:border-gray-700">
                <div className="mx-auto w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-white dark:text-black" />
                </div>
                <CardTitle className="text-2xl text-black dark:text-white">
                  Smart Notifications
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Real-time alerts for regulations affecting your business
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: notification.id * 0.1 }}
                      className={`p-4 border-l-4 ${
                        notification.urgent
                          ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900'
                      } rounded-r-lg`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div
                            className={`font-medium ${notification.urgent ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}
                          >
                            {notification.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {notification.country}
                          </div>
                        </div>
                        {notification.urgent && (
                          <div className="bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded-full">
                            URGENT
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
