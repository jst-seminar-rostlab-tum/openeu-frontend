'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useMeetingFilters = (startDate: Date, endDate: Date) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams();

    if (startDate) {
      params.set('startDate', startDate.toString());
    }
    if (endDate) {
      params.set('endDate', endDate.toString());
    }

    const qs = params.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;

    router.replace(newUrl, { scroll: false });
  }, [startDate, endDate, router, pathname]);
};

export default useMeetingFilters;
