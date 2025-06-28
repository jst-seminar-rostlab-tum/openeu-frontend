import { debounce } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

interface DebounceOptions {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

export function useDebounce<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(
  callback: T,
  delay: number,
  options?: DebounceOptions,
): T & { cancel: () => void; flush: () => void } {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFunction = useCallback(
    debounce(
      (...args: Parameters<T>) => callbackRef.current(...args),
      delay,
      options,
    ),
    [delay, options],
  );

  useEffect(() => {
    return () => {
      debouncedFunction.cancel();
    };
  }, [debouncedFunction]);

  return debouncedFunction as T & { cancel: () => void; flush: () => void };
}
