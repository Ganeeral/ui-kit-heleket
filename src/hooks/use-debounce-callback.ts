import { useCallback, useRef, useEffect } from 'react';

export const useDebounceCallback = (callback?: () => void, delay?: number) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callbackRef.current?.();
    }, delay);
  }, [delay]);
};
