'use client';

import {
  addDays,
  format,
  getDate,
  getWeekOfMonth,
  startOfWeek,
} from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import FeatureCard from '@/components/home/features/FeatureCard';
import FeaturesOperations from '@/operations/features/FeaturesOperations';

export default function CalendarFeature() {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(getDate(currentDate));

  const getCurrentWeekDays = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  };

  const hasEvent = (day: number) => FeaturesOperations.hasEventOnDate(day);
  const getEventType = (day: number) =>
    FeaturesOperations.getEventTypeForDate(day);

  return (
    <FeatureCard
      icon={Calendar}
      title="EU Calendar"
      description="Track important EU regulatory dates and deadlines"
    >
      <div className="space-y-3 p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-black dark:text-white text-sm">
            {format(currentDate, 'MMMM yyyy')} - Week{' '}
            {getWeekOfMonth(currentDate)}
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

        {/* Calendar Grid - Current week */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div
              key={day}
              className="p-1.5 text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
          {getCurrentWeekDays().map((date, index) => {
            const dayNumber = getDate(date);
            return (
              <div
                key={index}
                className={`p-1.5 text-sm cursor-pointer rounded relative ${
                  dayNumber === selectedDate
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white'
                }`}
                onClick={() => setSelectedDate(dayNumber)}
              >
                {dayNumber}
                {hasEvent(dayNumber) && (
                  <div
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      getEventType(dayNumber) === 'urgent'
                        ? 'bg-red-600 dark:bg-red-500'
                        : 'bg-blue-600 dark:bg-blue-500'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Date Events */}
        {FeaturesOperations.getEventsForDate(selectedDate)
          .slice(0, 1)
          .map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-2 rounded-lg border-l-4 ${
                event.type === 'urgent'
                  ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
                  : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
              }`}
            >
              <div
                className={`font-medium text-sm ${
                  event.type === 'urgent'
                    ? 'text-red-700 dark:text-red-300'
                    : 'text-blue-700 dark:text-blue-300'
                }`}
              >
                {event.title}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {format(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    event.date,
                  ),
                  'MMMM d, yyyy',
                )}
              </div>
            </motion.div>
          ))}
      </div>
    </FeatureCard>
  );
}
