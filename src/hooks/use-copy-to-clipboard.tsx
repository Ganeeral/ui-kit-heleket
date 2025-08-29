// import { useToast } from '@/app/providers/toasts-provider/lib/hooks/use-toast';

import { useToast } from "../providers/toasts-provider/lib/hooks/use-toast";

type CopyFn = (text?: string) => void;

export const useCopyToClipboard = (
  ref: React.RefObject<HTMLElement | null> | undefined,
  message: string,
  textToCopy?: string,
): [CopyFn, boolean] => {
  const navigator =
    typeof window === "undefined" ? undefined : window?.navigator;

  const hasClipboardApi = !!navigator?.clipboard?.writeText;

  const copyText: CopyFn = (text) => {
    let res = "";

    if (text) {
      res = text;
    } else if (textToCopy) {
      res = textToCopy;
    } else if (ref?.current?.textContent !== "") {
      res = ref?.current?.textContent ?? "";
    }

    if (hasClipboardApi) {
      navigator.clipboard.writeText(res || "");
      useToast().success({ description: message });
    }
  };

  return [copyText, hasClipboardApi];
};
