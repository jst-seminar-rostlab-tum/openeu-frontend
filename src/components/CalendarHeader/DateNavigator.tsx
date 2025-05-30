import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

import { useCalendar } from '@/components/CalendarHeader/CalendarContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { buttonHover, transition } from '@/domain/animations';
import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import type { TCalendarView } from '@/domain/types/calendar/types';
import { getEventsCount, navigateDate, rangeText } from '@/operations/meeting/CalendarHelpers';

interface IProps {
  view: TCalendarView;
  event: MeetingData[];
}

const MotionButton = motion.create(Button);
const MotionBadge = motion.create(Badge);

export function DateNavigator({ view, event }: IProps) {
  const { selectedDate, setSelectedDate } = useCalendar();

  const month = format(selectedDate, 'MMMM');
  const year = selectedDate.getFullYear();

  const eventCount = useMemo(
    () => getEventsCount(event, selectedDate, view),
    [event, selectedDate, view],
  );

  const handlePrevious = () =>
    setSelectedDate(navigateDate(selectedDate, view, 'previous'));
  const handleNext = () =>
    setSelectedDate(navigateDate(selectedDate, view, 'next'));

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <motion.span
          className="text-lg font-semibold"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={transition}
        >
          {month} {year}
        </motion.span>
        <AnimatePresence mode="wait">
          <MotionBadge
            key={eventCount}
            variant="secondary"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={transition}
          >
            {eventCount} events
          </MotionBadge>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        <MotionButton
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={handlePrevious}
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
        >
          <ChevronLeft className="h-4 w-4" />
        </MotionButton>

        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        >
          {rangeText(view, selectedDate)}
        </motion.p>

        <MotionButton
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={handleNext}
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
        >
          <ChevronRight className="h-4 w-4" />
        </MotionButton>
      </div>
    </div>
  );
}