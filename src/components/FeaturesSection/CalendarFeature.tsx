'use client';

import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import FeaturesOperations from '@/operations/features/FeaturesOperations';

export default function CalendarFeature() {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(15);

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const hasEvent = (day: number) => FeaturesOperations.hasEventOnDate(day);
  const getEventType = (day: number) =>
    FeaturesOperations.getEventTypeForDate(day);

  return (
    <Card className="h-full border-2 border-black dark:border-white bg-white dark:bg-gray-900">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-8 h-8 text-white dark:text-black" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl text-black dark:text-white">
              EU Calendar
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Track important EU regulatory dates and deadlines
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-black dark:text-white">
              {currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </h3>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div
                key={day}
                className="p-2 text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
            {getDaysInMonth().map((day, index) => (
              <div
                key={index}
                className={`p-2 text-sm cursor-pointer rounded relative ${
                  day === selectedDate
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : day
                      ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white'
                      : ''
                }`}
                onClick={() => day && setSelectedDate(day)}
              >
                {day}
                {day && hasEvent(day) && (
                  <div
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                      getEventType(day) === 'urgent'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Selected Date Events */}
          {FeaturesOperations.getEventsForDate(selectedDate).map(
            (event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg border-l-4 ${
                  event.type === 'urgent'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                }`}
              >
                <div className="font-medium text-black dark:text-white">
                  {event.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  December {event.date}, 2024
                </div>
              </motion.div>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}
