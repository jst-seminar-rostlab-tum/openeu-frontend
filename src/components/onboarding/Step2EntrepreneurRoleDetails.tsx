'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';

import { EntrepreneurRoleForm } from '@/components/profile/forms/EntrepreneurRoleForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { onboardingSchema } from '@/domain/schemas/profile';

interface Step2EntrepreneurRoleDetailsProps {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}

export default function Step2EntrepreneurRoleDetails({
  form,
}: Step2EntrepreneurRoleDetailsProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Tell us about your business</CardTitle>
        <CardDescription className="text-lg">
          Help us understand your company and industry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <EntrepreneurRoleForm form={form} />
        </motion.div>
      </CardContent>
    </Card>
  );
}
