import { useQuery } from '@tanstack/react-query';

import { countryRepository } from '@/repositories/countryRepository';

export const useCountries = (enabled = true) =>
  useQuery<string[]>({
    queryKey: ['countries'],
    queryFn: countryRepository.getCountries,
    enabled,
  });
