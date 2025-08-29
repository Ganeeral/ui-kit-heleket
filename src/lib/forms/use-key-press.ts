import { useCallback, useEffect } from 'react';

import type { DependencyList } from 'react';

type Handler = KeyboardEvent;

export default function useKeyPress(key: string, action: () => void, deps?: DependencyList) {
  const onKeyDown = useCallback((event: Handler) => {
    if (event.key === key) action();
  }, deps ?? []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, deps ?? []);
}
