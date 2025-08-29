/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

enum WindowSizesEnum {
  MOBILE = 375,
  MOBILE_L = 425,
  TABLET_S = 576,
  TABLET = 768,
  TABLET_L = 920,
  LAPTOP = 1024,
  LATOP_C = 1150,
  LAPTOP_L = 1440,
  DESKTOP = 1920,
  LAPTOP_XXL = 2560,
}

export const useResize = () => {
  const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = (event: any) => {
      setWidth(event.target.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isLargerLaptop: width >= WindowSizesEnum.LAPTOP,
    width,
  };
};
