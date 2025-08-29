import { useEffect, useState } from 'react';

export type Status = 'idle' | 'loading' | 'ready' | 'error';
export type ScriptElt = HTMLScriptElement | null;

export const useScript = (
  src: string,
  scriptLoading: { isAsync?: boolean; isDefer?: boolean },
): Status => {
  const [status, setStatus] = useState<Status>(src ? 'loading' : 'idle');

  useEffect(
    () => {
      if (!src) {
        setStatus('idle');

        return;
      }

      // Fetch existing script element by src
      // It may have been added by another instance of this hook
      let script: ScriptElt = document.querySelector(`script[src="${src}"]`);

      if (script) {
        // Grab existing script status from attribute and set to state.
        setStatus(script.dataset.status as Status);
      } else {
        // Create script
        script = document.createElement('script');
        script.src = src;

        if (scriptLoading?.isAsync) {
          script.async = true;
        } else if (scriptLoading?.isDefer) {
          script.defer = true;
        }

        script.dataset.status = 'loading';
        // Add script to document body
        document.body.append(script);

        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event: Event) => {
          script?.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
        };

        script.addEventListener('load', setAttributeFromEvent);
        script.addEventListener('error', setAttributeFromEvent);
      }

      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event: Event) => {
        setStatus(event.type === 'load' ? 'ready' : 'error');
      };

      // Add event listeners
      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);

      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src], // Only re-run effect if script src changes
  );

  return status;
};
