import { MeetingProvider } from '@/components/calendar/MeetingContext';

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <MeetingProvider excludeUrlParams={['view']}>{children}</MeetingProvider>
  );
}
