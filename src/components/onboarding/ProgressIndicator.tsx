'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  className,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn('w-full', className)}>
      <motion.div
        className="flex justify-between items-center mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm font-medium text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {Math.round(progress)}% Complete
        </span>
      </motion.div>

      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-primary h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            delay: 0.2,
          }}
        />
      </div>
    </div>
  );
};
