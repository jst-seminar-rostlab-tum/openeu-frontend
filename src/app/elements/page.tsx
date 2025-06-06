'use client';

import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { ToastOperations } from '@/operations/toast/toastOperations';

export default function Elements() {
  return (
    <Section
      variant="screenCentered"
      className="text-3xl font-bold flex flex-col items-center gap-6"
    >
      Paste and test you components here. ✌️
      <div className="flex gap-4 flex-wrap justify-center">
        <Button
          variant="outline"
          onClick={() => {
            ToastOperations.showInfo({
              title: 'Info',
              message:
                'This is a long info toast! Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            });
          }}
        >
          Show Info Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            ToastOperations.showWarning({
              title: 'Warning',
              message: 'This is an warning toast!',
            });
          }}
        >
          Show Warning Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            ToastOperations.showError({
              title: 'Error',
              message: 'This is an error toast!',
            });
          }}
        >
          Show Error Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            ToastOperations.showSuccess({
              title: 'Success',
              message: 'This is a success toast!',
            });
          }}
        >
          Show Success Toast
        </Button>
      </div>
    </Section>
  );
}
