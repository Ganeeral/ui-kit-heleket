/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

export type TRenderInitData = (initData: string | undefined) => void;

export const useCheckTgWebApp = (renderInitData: TRenderInitData) => {
  useEffect(() => {
    if ((window as any)?.Telegram?.WebApp) {
      renderInitData((window as any)?.Telegram?.WebApp?.initData);

      return;
    }

    const observer = new MutationObserver((mutationsList, observer) => {
      if ((window as any)?.Telegram?.WebApp) {
        renderInitData((window as any)?.Telegram?.WebApp?.initData);
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);
};
