'use client';

import { Globe } from 'lucide-react';

import Map from '@/components/Map/Map';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
export default function MapFeature() {
  return (
    <Card className="h-full border-2 border-black dark:border-white bg-white dark:bg-gray-900">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
            <Globe className="w-8 h-8 text-white dark:text-black" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl text-black dark:text-white">
              EU Regulation Map
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Visualize regulatory activity across EU member states
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <Map />
        </div>
      </CardContent>
    </Card>
  );
}
