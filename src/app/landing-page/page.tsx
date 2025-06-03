'use client';

import { motion, useInView } from 'framer-motion';
import { 
  ArrowRight,
  Bell, 
  Search, 
  Shield,
  TrendingUp,
  Zap} from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const storyInView = useInView(storyRef, { once: true });
  const missionInView = useInView(missionRef, { once: true });

  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New GDPR Amendment', country: 'EU-Wide', urgent: true },
    { id: 2, title: 'Digital Services Act Update', country: 'Germany', urgent: false },
    { id: 3, title: 'AI Regulation Draft', country: 'France', urgent: true }
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black dark:bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-gray-800 dark:via-gray-900 dark:to-black" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
                Powered by Agentic AI, OpenEU transforms how organizations navigate EU regulations, 
                ensuring compliance and transparency across all member states.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 bg-white text-black hover:bg-gray-100" asChild>
                <Link href="/register">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400">Documents Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white">27</div>
                <div className="text-sm text-gray-400">EU Member States</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Features Section */}
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
              Try our core features that make EU compliance effortless and transparent.
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
                  <CardTitle className="text-2xl text-black dark:text-white">AI-Powered Search</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Find relevant EU regulations instantly with contextual AI search
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
                            <div className="font-medium text-black dark:text-white">General Data Protection Regulation (GDPR)</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">EU-wide • Updated 2 days ago</div>
                          </div>
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <div className="font-medium text-black dark:text-white">Digital Services Act Implementation</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Germany • New requirements</div>
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
                  <CardTitle className="text-2xl text-black dark:text-white">Smart Notifications</CardTitle>
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
                            <div className={`font-medium ${notification.urgent ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                              {notification.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{notification.country}</div>
                          </div>
                          {notification.urgent && (
                            <div className="bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded-full">
                              URGENT
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    
                    <div className="text-center pt-4">
                      <Button 
                        variant="outline" 
                        className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                        onClick={() => setNotifications([...notifications, {
                          id: notifications.length + 1,
                          title: 'Sustainability Reporting Directive',
                          country: 'Netherlands',
                          urgent: false
                        }])}
                      >
                        Load More Notifications
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section ref={storyRef} className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-black dark:text-white">
                  Why We Built OpenEU
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  As a compliance officer at a multinational corporation, I spent countless hours 
                  manually tracking regulatory changes across 27 EU member states. Missing a single 
                  regulation could cost millions in fines and damage our reputation.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  The complexity of EU regulations, with their interconnected directives, amendments, 
                  and implementation deadlines, made it nearly impossible to stay compliant without 
                  a dedicated team of legal experts.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border-l-4 border-black dark:border-white p-6 rounded-r-lg">
                <p className="text-lg font-medium italic text-black dark:text-white">
                  OpenEU transforms this chaos into clarity, giving every organization 
                  the power of AI-driven compliance monitoring.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  — Maria Santos, Co-Founder & Former Compliance Director
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-black dark:text-white mb-2">€2.3B</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      GDPR fines in 2023 alone
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-black dark:text-white mb-2">40hrs</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Average weekly compliance work
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6 pt-8">
                <Card className="bg-black dark:bg-white border-2 border-black dark:border-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-white dark:text-black mb-2">95%</div>
                    <div className="text-sm text-gray-300 dark:text-gray-600">
                      Time saved with OpenEU
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-black dark:bg-white border-2 border-black dark:border-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-white dark:text-black mb-2">0</div>
                    <div className="text-sm text-gray-300 dark:text-gray-600">
                      Missed regulations
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-24 bg-black dark:bg-gray-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-bold">
                Project Europe&apos;s Mission
              </h2>
              <p className="text-xl lg:text-2xl text-gray-300 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
                In partnership with the EU Parliament, we are building the digital infrastructure 
                for a transparent, efficient, and accessible European Union.
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
                  Making EU regulations accessible and understandable for all citizens and organizations.
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
                  Streamlining compliance processes to reduce bureaucracy and accelerate innovation.
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
                  Empowering European businesses to thrive in a compliant, competitive global market.
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
                  Join the Future of EU Compliance <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
