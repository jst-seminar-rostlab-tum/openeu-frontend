import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface SampleComponentProps {
  title: string;
  description: string;
}

function SampleComponent({ title, description }: SampleComponentProps) {
  return (
    <Card className="w-full max-w-md border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 leading-relaxed">
          This is additional content inside the card. You can customize it
          further.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="mt-4">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SampleComponent;
