import { useEffect } from 'react';

import type { RefObject } from 'react';

function useClickInside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent) => void,
): void {
  useEffect(() => {
    const handleClickInside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (ref.current && ref.current.contains(target)) {
        const buttonElement = target.closest('button');

        if (buttonElement && ref.current.contains(buttonElement)) {
          handler(event);
        }
      }
    };

    document.addEventListener('click', handleClickInside, true);

    return () => {
      document.removeEventListener('click', handleClickInside, true);
    };
  }, [ref, handler]);

  return;
}

export default useClickInside;
