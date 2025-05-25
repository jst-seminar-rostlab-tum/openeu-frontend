'use client';

import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import ToastOperations from '@/operations/toast/toastOperations';

export default function Elements() {
  return (
    <Section
      variant="screenCentered"
      className="text-3xl font-bold flex flex-col items-center gap-6"
    >
      Paste and test you components here. ✌️
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => {
            ToastOperations.showInfo(
              'Info',
              'This is a long info toast! Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            );
          }}
        >
          Show Info Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            ToastOperations.showWarning('Warning', 'This is an warning toast!');
          }}
        >
          Show Warning Toast
        </Button>
      </div>
    </Section>
  );
}
