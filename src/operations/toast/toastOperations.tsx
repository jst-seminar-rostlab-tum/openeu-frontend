import { toast } from 'sonner';

export default class ToastOperations {
  private static show(
    type: 'info' | 'warning',
    title: string,
    message: string,
    className: string,
  ) {
    toast[type](title, {
      description: message,
      className: `!items-start [&>div:first-child]:!mt-[2px] !font-bold ${className}`,
      descriptionClassName: '!text-inherit',
    });
  }

  static showInfo(title: string, message: string) {
    this.show(
      'info',
      title,
      message,
      '!bg-sky-100 !text-sky-800 border !border-sky-200 dark:!bg-[#053048] dark:!text-sky-100 dark:!border-sky-800',
    );
  }

  static showWarning(title: string, message: string) {
    this.show(
      'warning',
      title,
      message,
      '!bg-amber-100 !text-amber-700 border !border-yellow-400 dark:!bg-[#502305] dark:!text-yellow-100 dark:!border-yellow-800',
    );
  }
}
