import { toast } from 'sonner';

enum ToastType {
  INFO = 'info',
  WARNING = 'warning',
}

interface ToastConfig {
  title: string;
  message: string;
}

const TOAST_STYLES: Record<ToastType, string> = {
  [ToastType.INFO]:
    '!bg-sky-50 !text-sky-800 border !border-sky-200 dark:!bg-sky-950 dark:!text-sky-50 dark:!border-sky-800',
  [ToastType.WARNING]:
    '!bg-yellow-50 !text-yellow-700 border !border-yellow-400 dark:!bg-yellow-950 dark:!text-yellow-100 dark:!border-yellow-800',
};

export class ToastOperations {
  private static show(type: ToastType, { title, message }: ToastConfig): void {
    toast[type](title, {
      description: message,
      className: `!items-start [&>div:first-child]:!mt-[2px] !font-bold ${TOAST_STYLES[type]}`,
      descriptionClassName: '!text-inherit',
    });
  }

  static showInfo({ title, message }: ToastConfig): void {
    this.show(ToastType.INFO, { title, message });
  }

  static showWarning({ title, message }: ToastConfig): void {
    this.show(ToastType.WARNING, { title, message });
  }
}
