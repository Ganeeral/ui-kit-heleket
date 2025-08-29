import { useLayoutEffect, useState } from 'react';

type BreakpointsKey =
  | 'mobile'
  | 'mobileL'
  | 'tabletS'
  | 'tablet'
  | 'tabletL'
  | 'laptop'
  | 'laptopC'
  | 'laptopL'
  | 'laptopXL';

type MediaQueryValue = BreakpointsKey | number;

const Breakpoints: Record<BreakpointsKey, number> = {
  laptop: 1024,
  laptopC: 1150,
  laptopL: 1440,
  laptopXL: 2560,
  mobile: 375,
  mobileL: 425,
  tablet: 768,
  tabletL: 920,
  tabletS: 576,
};

export const useMediaQuery = (media: MediaQueryValue): boolean | undefined => {
  const [isBreakPoint, setIsBreakPoint] = useState<boolean | undefined>();

  const getBreakPoint = (media: MediaQueryValue): number => {
    if (typeof media === 'number') return media;

    return Breakpoints[media];
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= getBreakPoint(media)) {
        setIsBreakPoint(true);
      } else {
        setIsBreakPoint(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [media]);

  return isBreakPoint;
};
