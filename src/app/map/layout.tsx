import { CalendarProvider } from '@/components/CalendarHeader/CalendarContext';

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <CalendarProvider>{children}</CalendarProvider>;
}
