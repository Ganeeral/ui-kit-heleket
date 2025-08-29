import { useMediaQuery } from "../dom-helpers/use-media-query";

export const useGetSelectorHeightInBurger = (): string => {
  const isTabletS = useMediaQuery("tabletS");

  return isTabletS ? "calc(100vh - 60px)" : "calc(100vh - 80px)";
};
