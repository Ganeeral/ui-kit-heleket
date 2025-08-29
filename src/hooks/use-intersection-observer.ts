import { useEffect, useMemo, useState } from 'react';

const defaultOptions = {
  root: typeof document === 'undefined' ? null : document,
  rootMargin: '0px',
  threshold: 0.5,
};

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = defaultOptions,
) => {
  const [element, callbackRef] = useState<HTMLElement | null>(null);

  const observer = useMemo(() => {
    if (typeof document === 'undefined')
      return {
        observe: () => {},
        unobserve() {},
      };

    return new IntersectionObserver(callback, options);
  }, [callback, options]);

  useEffect(() => {
    if (!element) return;
    observer.observe(element);

    return () => {
      if (!element) return;
      observer.unobserve(element);
    };
  }, [element, observer]);

  if (typeof document !== 'undefined') return callbackRef;
};
