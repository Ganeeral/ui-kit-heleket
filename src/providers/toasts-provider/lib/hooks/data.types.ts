import type { Id, TypeOptions } from 'react-toastify';

export type ToastType = Exclude<TypeOptions, 'info' | 'default'>;

export interface ToastContentProps {
  description: string;
  type: ToastType;
  buttons?: {
    buttonLeft: {
      action: () => void;
      title: string;
    };
    buttonRight: {
      action: () => void;
      title: string;
    };
  };
  title?: string;
  toastId?: Id;
}
