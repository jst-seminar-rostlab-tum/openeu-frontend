import { useQuery } from '@tanstack/react-query';

import { Topic } from '@/domain/entities/calendar/generated-types';
import { topicRepository } from '@/repositories/topicRepository';

export const useTopics = (enabled = true) =>
  useQuery<Topic[]>({
    queryKey: ['topics'],
    queryFn: topicRepository.getTopics,
    enabled,
  });
