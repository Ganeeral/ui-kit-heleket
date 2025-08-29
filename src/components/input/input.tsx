import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from "react";

import styles from "./input.module.scss";
import { variantsTypography } from "./input.types";
import { AutosizeInput } from "../autosize-input/autosize-input";

import type { IInputProps } from "./input.types";
import type { Variants } from "framer-motion";
import type { FC, PropsWithChildren } from "react";
import Typography from "../typography/index";
import { Icon } from "../icon/index";

const InputIconWrapper: FC<PropsWithChildren> = React.memo(({ children }) => (
  <div className={styles.input__icon}>{children}</div>
));

const variantsMotion: Variants = {
  animate: {
    height: "auto",
    marginTop: "8px",
    opacity: 1,
    transition: { duration: 0.2, ease: "easeInOut" },
    y: 0,
  },
  exit: {
    height: 0,
    marginTop: "0px",
    opacity: 0,
    transition: { duration: 0.2 },
    y: -10,
  },
  initial: {
    height: 0,
    opacity: 0,
    y: -10,
  },
};

export interface IInputRef {
  inputID: string;
}

function handleDecimalInput(value: string, decimal: number): string {
  const regex = new RegExp(`^-?\\d+(?:\\.\\d{0,${decimal}})?`);
  const match = value.match(regex);

  return match ? match[0] : value;
}

/**
 * Input Component
 *
 * React component for a text input with customizable styles and error state.
 *
 * @component
 * @example
 * // Example usage of Input component
 * <Input
 *   type="email"
 *   label="Email"
 *   placeholder="Enter your email"
 *   onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
 * />
 *
 * @param {string} className - Additional CSS class names to apply to the component.
 * @param {'text' | 'password' | 'number' | 'email'} [type='text'] - Type of the input element.
 * @param {string} [value] - The current value of the input.
 * @param {string} [placeholder] - Placeholder text for the input.
 * @param {boolean} [disabled=false] - Indicates whether the input is disabled.
 * @param {boolean} [required=false] - Indicates whether the input is required.
 * @param {(event: ChangeEvent<HTMLInputElement>) => void} [onChange] - Event handler for the input's `onChange` event.
 * @param {string} [label] - Label for the input.
 * @param {'default'} [variant='normal'] - Style variant for the input.
 * @param {{regex: RegExp, error: string}[]} [validation] - Array of objects containing a RegExp for validation
 * and an error message for invalid inputs.
 * @param {React.ReactNode} [children] - Content to display to the right of the input.
 * @param {boolean} [autoFocus=false] - Indicates whether the input should be automatically focused when mounted.
 * @param {number} [debounce=0] - Time in milliseconds to debounce the input's `onChange` event.
 * @param {boolean} [autosize] - Indicates whether the input should be autosized.
 * @param {IAutosizeInputProps} [autosizeProps] - Additional props for the `AutosizeInput` component.
 * @param {number} [decimal] - Number of decimal places to limit the input value to.
 *
 * @returns {JSX.Element} - Rendered Input component.
 */
export const Input = forwardRef<IInputRef, IInputProps>(
  (
    {
      className,
      onChange,
      label,
      rightLabel,
      variant = "normal",
      hintText,
      iconLeft,
      iconRight,
      error,
      disabled,
      tabIndex,
      blockRight,
      autosize = false,
      autosizeProps,
      trim = false,
      decimal,
      labelTextClassName,
      autofocus,
      ...inputProps
    },
    ref,
  ) => {
    const inputID = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        blur: () => inputRef.current?.blur(),
        focus: () => inputRef.current?.focus(),
        inputID,
      }),
      [inputID, inputRef.current],
    );

    useEffect(() => {
      if (inputProps.autoFocus) {
        inputRef.current?.focus();
      }
    }, [inputProps.autoFocus]);

    const preventWheel = () => {
      if (inputProps.type === "number") {
        inputRef.current?.blur();
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (trim) {
        event.target.value = event.target.value.replace(/\s+/g, "");
      }

      if (decimal !== undefined) {
        let value = event.target.value;

        value = handleDecimalInput(value, decimal);
        event.target.value = value;
      }

      onChange?.(event);
    };

    return (
      <div className={styles.container}>
        {(label || rightLabel) && (
          <div
            className={clsx(styles.label_container, {
              [styles.disabled]: disabled,
            })}
          >
            {label && (
              <label
                htmlFor={inputID}
                className={clsx(
                  styles.input__label,
                  styles[`input__label_${variant}`],
                )}
              >
                <Typography
                  className={labelTextClassName}
                  variant={variantsTypography[variant].label.variant}
                >
                  {label}
                </Typography>
              </label>
            )}
            {rightLabel && (
              <label
                htmlFor={inputID}
                className={clsx(
                  styles.input__label,
                  styles[`input__label_${variant}`],
                )}
              >
                {typeof rightLabel === "string" ? (
                  <Typography
                    variant={variantsTypography[variant].label.variant}
                  >
                    {rightLabel}
                  </Typography>
                ) : (
                  rightLabel
                )}
              </label>
            )}
          </div>
        )}
        <label
          tabIndex={tabIndex}
          htmlFor={inputID}
          className={clsx(
            styles.input__wrapper,
            styles[`input__wrapper_${variant}`],
            className,
            {
              [styles.input__wrapper_error]: error,
              [styles.input__wrapper_disabled]: disabled,
              [styles.input__wrapper_autosize]: autosize,
            },
          )}
        >
          <div className={styles.input__left}>
            {iconLeft && <InputIconWrapper>{iconLeft}</InputIconWrapper>}
            {autosize ? (
              <AutosizeInput
                inputClassName={clsx(
                  autosizeProps?.inputClassName,
                  styles.input,
                )}
                disabled={disabled}
                id={inputID}
                autoFocus={autofocus}
                onChange={handleChange}
                {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
                {...autosizeProps}
              />
            ) : (
              <input
                ref={inputRef}
                className={styles.input}
                disabled={disabled}
                id={inputID}
                autoFocus={autofocus}
                onWheel={preventWheel}
                onChange={handleChange}
                {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
              />
            )}
          </div>

          {iconRight && <InputIconWrapper>{iconRight}</InputIconWrapper>}
          {blockRight && blockRight}
        </label>

        <AnimatePresence>
          {hintText && !error && (
            <Typography variant="p3_r" className={clsx(styles.input__hint)}>
              {hintText}
            </Typography>
          )}

          {error && (
            <motion.div
              className={clsx(
                styles.input__errorWrapper,
                styles[`input__errorWrapper_${variant}`],
              )}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variantsMotion}
            >
              <Icon
                size={16}
                color="special_red"
                name="common/attention-outline"
              />
              <Typography
                variant={variantsTypography[variant].error.variant}
                className={styles.input__error}
              >
                {error}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
