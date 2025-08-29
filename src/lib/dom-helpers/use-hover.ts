import { useCallback, useEffect, useRef, useState } from 'react';

import type { RefObject } from 'react';

interface IUseHover<T> {
  isHovered: boolean;
  ref: RefObject<T>;
}

/**
 * Generates a custom hook that tracks whether the specified element is being hovered over.
 *
 * @return {IUseHover<T>} An object containing the boolean state
 * of whether the element is hovered over and a ref to the element.
 */

export const useHover = <T extends HTMLElement>(): IUseHover<T | null> => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const ref = useRef<T>(null);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [ref.current]);

  return { isHovered, ref };
};
