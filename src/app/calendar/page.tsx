import Calendar from '@/components/MonthlyCalendar/MonthlyCalendar';
import { getEvents } from '@/operations/meeting/CalendarHelpers';

export default async function CalendarPage() {
  const events = await getEvents();
  return <Calendar events={events} />;
}
