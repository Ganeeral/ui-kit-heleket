import { useState } from 'react';

import { useInterval } from '../hooks/use-interval';

export const useDebounceForm = () => {
  // Этот хук создан для дебоунса событий в форме
  const [debounce, setDebounce] = useState<number>(0);

  useInterval(
    () => {
      setDebounce(debounce - 1);
    },
    debounce > 0 ? 1000 : null,
  );

  return {
    debounce,
    setDebounce,
  };
};
