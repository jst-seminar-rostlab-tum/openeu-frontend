import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  children,
}: FeatureCardProps) {
  return (
    <Card className="h-full border-slate-700 dark:border-slate-50 !p-0 gap-0">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700 !p-4 flex items-center gap-3">
        <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white dark:text-black" />
        </div>
        <div className="text-left">
          <CardTitle className="text-xl text-black dark:text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="!p-4">{children}</CardContent>
    </Card>
  );
}
