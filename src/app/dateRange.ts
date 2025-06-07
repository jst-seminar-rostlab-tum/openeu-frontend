import { endOfMonth, startOfMonth } from 'date-fns';

export const getCurrentMonthRange = () => {
  const now = new Date();
  return {
    startDate: startOfMonth(now).toISOString(),
    endDate: endOfMonth(now).toISOString(),
    now: now,
  };
};
