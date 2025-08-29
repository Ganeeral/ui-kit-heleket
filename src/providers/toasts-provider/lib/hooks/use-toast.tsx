import clsx from "clsx";
import { toast, type ToastOptions, type TypeOptions } from "react-toastify";

import { Icon } from "../../../../components/icon/index";

import { type ToastType, type ToastContentProps } from "./data.types";
import styles from "./toast-content.module.scss";

import type { ReactNode } from "react";

const iconByStatus: Record<TypeOptions, ReactNode> = {
  default: <Icon name="common/info-fill" size={18} />,
  error: <Icon color="special_red" name="common/attention-fill" size={18} />,
  info: <Icon name="common/info-fill" size={18} />,
  success: <Icon color="special_green" name="common/check2-fill" size={18} />,
  warning: <Icon color="text_primary" name="common/attention-fill" size={18} />,
};

const ToastIcon = ({ type }: { type: TypeOptions }) => (
  <div className={clsx(styles.icon, styles[type])}>{iconByStatus[type]}</div>
);

const ToastContent = ({
  title,
  description,
  buttons,
  type,
}: ToastContentProps) => (
  <div className={styles.content}>
    <div className={styles.leftContent}>
      <ToastIcon type={type} />
      <div>
        {title && title}
        <p className={styles.description}>{description}</p>
      </div>
    </div>
    {buttons && (
      <div className={styles.buttons}>
        <button className={styles.button} onClick={buttons.buttonLeft.action}>
          {buttons.buttonLeft.title}
        </button>
        <button className={styles.button} onClick={buttons.buttonRight.action}>
          {buttons.buttonRight.title}
        </button>
      </div>
    )}
  </div>
);

export const showToast = (
  type: ToastType,
  props: Omit<ToastContentProps, "type">,
  options?: ToastOptions,
) => {
  toast[type](<ToastContent {...props} type={type} />, { ...options });
};

export const useToast = () => ({
  error: (props: Omit<ToastContentProps, "type">, options?: ToastOptions) =>
    showToast("error", props, options),
  success: (props: Omit<ToastContentProps, "type">, options?: ToastOptions) =>
    showToast("success", props, options),
  warning: (props: Omit<ToastContentProps, "type">, options?: ToastOptions) =>
    showToast("warning", props, options),
});
