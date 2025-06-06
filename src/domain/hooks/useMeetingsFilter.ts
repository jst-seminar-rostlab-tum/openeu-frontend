'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useMeetingFilters = (startDate: string, endDate: string) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams();

    if (startDate) {
      params.set('start', startDate);
    }
    if (endDate) {
      params.set('end', endDate);
    }

    const qs = params.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;

    router.replace(newUrl, { scroll: false });
  }, [startDate, endDate, router, pathname]);
};

export default useMeetingFilters;
