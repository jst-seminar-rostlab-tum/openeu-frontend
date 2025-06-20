import { toast } from 'sonner';

enum ToastType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

interface ToastConfig {
  title: React.ReactNode | string;
  message: React.ReactNode | string;
}

const TOAST_STYLES: Record<ToastType, string> = {
  [ToastType.INFO]:
    '!bg-sky-50 !text-sky-800 border !border-sky-200 dark:!bg-sky-950 dark:!text-sky-50 dark:!border-sky-800',
  [ToastType.WARNING]:
    '!bg-yellow-50 !text-yellow-700 border !border-yellow-400 dark:!bg-yellow-950 dark:!text-yellow-100 dark:!border-yellow-800',
  [ToastType.ERROR]:
    '!bg-red-50 !text-red-800 border !border-red-200 dark:!bg-red-950 dark:!text-red-50 dark:!border-red-800',
  [ToastType.SUCCESS]:
    '!bg-green-50 !text-green-800 border !border-green-200 dark:!bg-green-950 dark:!text-green-50 dark:!border-green-800',
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

  static showError({ title, message }: ToastConfig): void {
    this.show(ToastType.ERROR, { title, message });
  }

  static showSuccess({ title, message }: ToastConfig): void {
    this.show(ToastType.SUCCESS, { title, message });
  }
}
