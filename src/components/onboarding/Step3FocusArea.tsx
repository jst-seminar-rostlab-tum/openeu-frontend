import React from 'react';

import { FocusAreaForm } from '@/components/profile/forms/FocusAreaForm';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const Step3FocusArea = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Focus Areas</CardTitle>
        <CardDescription className="text-lg">
          Tell us what topics and regions you&apos;re most interested in
        </CardDescription>
      </CardHeader>
      <FocusAreaForm />
    </Card>
  );
};
