import { useQuery } from '@tanstack/react-query';

import { TopicData } from '@/domain/entities/calendar/TopicData';
import { topicRepository } from '@/repositories/topicRepository';

export const useTopics = (enabled = true) =>
  useQuery<TopicData[]>({
    queryKey: ['topics'],
    queryFn: topicRepository.getTopics,
    enabled,
  });
