import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

export function useSuspenseQuery<TData, TError = Error>(
  options: UseQueryOptions<TData, TError>,
): UseQueryResult<TData, TError> {
  const query = useQuery(options);

  if (query.isLoading) {
    throw new Promise((resolve) => {
      query.refetch().then(() => {
        resolve(undefined);
      });
    });
  }

  return query;
}
