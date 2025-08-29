import { useEffect } from 'react';

import type { RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: Event) => void,
  disabledClasses?: string,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;

      if (
        !el ||
        el.contains((event?.target as Node) || null) ||
        (disabledClasses && (event?.target as Element)?.closest(`.${disabledClasses}`))
      ) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};

export default useOnClickOutside;
