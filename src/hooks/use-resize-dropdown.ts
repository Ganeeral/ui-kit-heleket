import { useEffect, useState } from 'react';

export const useResizeDropdown = (
  ref: React.RefObject<HTMLDivElement | null> | null,
  triggerRender?: boolean,
) => {
  const [dropdownWidth, setDropdownWidth] = useState<number>(0);

  useEffect(() => {
    if (ref?.current && typeof window !== 'undefined') {
      const handleSetWidth = () => setDropdownWidth(ref?.current?.clientWidth || 460);

      handleSetWidth();

      window.addEventListener('resize', handleSetWidth);

      return () => window.removeEventListener('resize', handleSetWidth);
    }
  }, [ref?.current, triggerRender]);

  return { width: dropdownWidth };
};
