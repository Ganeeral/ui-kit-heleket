'use client';

import { useMemo, useState, useEffect } from 'react';

const defaultOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = defaultOptions,
) => {
  const [element, callbackRef] = useState<HTMLElement | null>(null);

  const observer = useMemo(
    () => (typeof document === 'undefined' ? null : new IntersectionObserver(callback, options)),
    [callback, options],
  );

  useEffect(() => {
    if (!element || !observer) return;
    observer.observe(element);

    return () => {
      if (!element) return;
      observer.unobserve(element);
    };
  }, [element, observer]);

  if (typeof document !== 'undefined') return callbackRef;
};
