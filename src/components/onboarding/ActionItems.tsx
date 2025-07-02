'use client';

import { motion } from 'framer-motion';
import { Calendar, FileText, TrendingUp } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProfileData } from '@/domain/entities/profile/ProfileData';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface ActionItemProps {
  profile: Partial<ProfileData>;
}

const ActionItems: React.FC<ActionItemProps> = ({ profile }) => {
  const actionItems = [
    {
      id: 'meetings',
      icon: Calendar,
      title: 'Relevant Meetings This Week',
      count: 4,
      description: `EU meetings discussing ${profile.primaryIndustry} regulations`,
      preview: [
        'Digital Services Committee - AI Regulation',
        'GDPR Working Group - Data Protection Updates',
        'Green Deal Committee - Sustainability Standards',
        'Single Market Committee - Cross-border Commerce',
      ],
      buttonText: 'View Calendar',
      insight: 'High priority - affects your business model directly',
    },
    {
      id: 'updates',
      icon: FileText,
      title: 'Regulatory Updates',
      count: 12,
      description: `New regulations affecting ${profile.businessModel} businesses`,
      preview: [
        'AI Act implementation guidelines released',
        'GDPR enforcement in fintech sector',
        'Digital Services Act compliance deadline',
        'Green taxonomy reporting requirements',
      ],
      buttonText: 'Read Updates',
      insight: 'Critical updates requiring immediate attention',
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-4"
    >
      {actionItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            variants={staggerItem}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <motion.div
                      className="p-2 bg-primary/10 rounded-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    {item.title}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2 + index * 0.1,
                        type: 'spring',
                        stiffness: 200,
                      }}
                    >
                      <Badge variant="secondary" className="ml-2">
                        {item.count}
                      </Badge>
                    </motion.div>
                  </CardTitle>
                </div>
                <CardDescription>{item.description}</CardDescription>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-xs text-primary font-medium"
                >
                  💡 {item.insight}
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {item.preview.slice(0, 3).map((previewItem, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 + idx * 0.05 }}
                      whileHover={{
                        x: 4,
                        backgroundColor: 'hsl(var(--primary) / 0.05)',
                      }}
                      className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg cursor-pointer transition-colors"
                    >
                      {item.id === 'connections' ? (
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {previewItem.split(' ')[0][0]}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            delay: idx * 0.3,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                      <span className="text-sm">{previewItem}</span>
                    </motion.div>
                  ))}

                  {item.count > 3 && (
                    <motion.p
                      className="text-xs text-muted-foreground pl-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      +{item.count - 3} more...
                    </motion.p>
                  )}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 group"
                  >
                    <TrendingUp className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    {item.buttonText}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ActionItems;
