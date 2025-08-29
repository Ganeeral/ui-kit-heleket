import clsx from "clsx";
import { Slide, ToastContainer } from "react-toastify";

import { Icon } from "../../components/icon/index";

import styles from "./toasts-provider.module.scss";

import type { CloseButtonProps, ToastContainerProps } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <button className={styles.close} onClick={closeToast}>
    <Icon name="common/icon-close" size={12} />
  </button>
);

export const ToastsProvider = (props: ToastContainerProps) => {
  return (
    <ToastContainer
      draggable
      hideProgressBar
      pauseOnHover
      autoClose={3000}
      className={clsx(styles.toast, styles.light)}
      icon={false}
      limit={3}
      position={"top-right"}
      transition={Slide}
      closeButton={CloseButton}
      {...props}
    />
  );
};
