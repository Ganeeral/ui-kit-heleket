import { useEffect } from 'react';

import type { RefObject } from 'react';

export const useAutosizeTextArea = (
  textareaRef: RefObject<HTMLTextAreaElement>,
  offResize?: boolean,
) => {
  const handleResize = () => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = '0px';
    const scrollHeight = textareaRef.current.scrollHeight;

    textareaRef.current.style.height = scrollHeight + 'px';
  };

  handleResize();

  useEffect(() => {
    if (!textareaRef.current || offResize) return;

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [textareaRef]);
};
