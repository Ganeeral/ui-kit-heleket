"use client";

/** @module Button */

import React, { cloneElement, isValidElement } from "react";
import clsx from "clsx";
import type { ElementType, ReactNode } from "react";
import type { TButtonProps } from "./types";
import Typography from "../typography/index";
import styles from "./button.module.scss";
import { Icon } from "../icon";

/**
 * Renders a customizable button component.
 *
 * @template E - The type of the element to render, defaults to 'button'.
 *
 * @param {E} [as='button'] - The HTML element or custom component type to use for the button.
 * @param {ReactNode} children - The content to display within the button.
 * @param {ButtonAppearance} [appearance='primary'] - The visual style or theme of the button.
 * @param {ButtonSize} [size='m'] - The size of the button, which determines its padding and height.
 * @param {boolean} [isLoading=false] - If true, displays a loading spinner within the button
 * and disables click interactions.
 * @param {boolean} [disabled=false] - If true, the button is disabled and unclickable.
 * @param {ReactNode} [leftIcon] - An icon to display to the left of the button's content.
 * @param {ReactNode} [rightIcon] - An icon to display to the right of the button's content.
 * @param {string} [className] - Additional CSS class names to apply to the button for custom styling.
 * @param {boolean} [asChild=false] - If true, renders the button as a child element of another component.
 * @param {'center' | 'left' | 'right'} [align='center'] - Alignment of the button's content within its container.
 * @param {boolean} [fullWidth=false] - If true, the button will expand to the full width of its container.
 * @param {(e: React.MouseEvent<HTMLElement>) => void} [onClick] - The event handler for button click actions.
 * @param {TButtonProps<E>} props - Additional properties for the button component.
 *
 * @returns {React.ReactElement | null} The rendered button component or null
 * if `asChild` is true without valid children.
 */

export const Button = <E extends ElementType = "button">({
  as,
  children,
  appearance = "primary",
  size = "m",
  isLoading,
  disabled,
  leftIcon,
  rightIcon,
  className,
  asChild,
  align = "center",
  fullWidth,
  onClick,
  ...props
}: TButtonProps<E>): React.ReactElement | null => {
  const isDisabled = disabled || isLoading;
  const Component = as || "button";

  const supportsDisabled =
    ["button", "input", "select", "textarea"].includes(Component as string) &&
    !asChild;

  const combinedProps = {
    className: clsx(
      styles.btn,
      styles[appearance],
      styles[align],
      {
        [styles[size]]: size !== "custom",
        [styles.custom]: appearance === "custom",
        [styles.fullWidth]: fullWidth,
        [styles.loading]: isLoading,
        [styles.disabled]: isDisabled,
      },
      className,
    ),
    ...(supportsDisabled
      ? { disabled: isDisabled }
      : { "aria-disabled": isDisabled }),
    ...props,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      if (isDisabled) {
        e.preventDefault();
        e.stopPropagation();

        return;
      }

      if (onClick) {
        onClick(e);
      }
    },
  };

  const renderContent = (children: ReactNode): React.ReactElement => (
    <>
      {leftIcon && <span className={styles.buttonIcon}>{leftIcon}</span>}
      {isLoading && (
        <Icon name="loaders/loader" className={styles.buttonSpin} />
      )}
      {typeof children === "string" && children ? (
        <Typography className={styles.buttonText} variant="button">
          {children}
        </Typography>
      ) : (
        children
      )}
      {rightIcon && <span className={styles.buttonIcon}>{rightIcon}</span>}
    </>
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...combinedProps,
      children: renderContent(children.props.children),
    });
  } else if (asChild) {
    return null;
  }

  return <Component {...combinedProps}>{renderContent(children)}</Component>;
};

Button.displayName = "Button";
