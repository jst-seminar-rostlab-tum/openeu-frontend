'use client';

import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PathDecisionFormProps {
  action?: (formData: FormData) => Promise<void>;
}

export function PathDecisionForm({ action }: PathDecisionFormProps) {
  // If server action is provided, use native form submission
  if (action) {
    return (
      <form action={action}>
        <CardContent className="space-y-6">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div>
              <label className="text-base font-semibold">I am a:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="userCategory"
                      value="entrepreneur"
                      defaultChecked
                      className="sr-only"
                    />
                    <Card className="cursor-pointer transition-all hover:bg-muted/50 has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
                      <CardContent className="p-6 text-center">
                        <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                        <h3 className="font-semibold text-lg mb-2">
                          Entrepreneur
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Building or running a business, startup, or company
                        </p>
                      </CardContent>
                    </Card>
                  </label>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="userCategory"
                      value="politician"
                      className="sr-only"
                    />
                    <Card className="cursor-pointer transition-all hover:bg-muted/50 has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
                      <CardContent className="p-6 text-center">
                        <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                        <h3 className="font-semibold text-lg mb-2">
                          Politician/Policy Maker
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Working in politics, policy making, or public service
                        </p>
                      </CardContent>
                    </Card>
                  </label>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </CardContent>

        <motion.div
          className="flex justify-end p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button type="submit">Next</Button>
        </motion.div>
      </form>
    );
  }
}
