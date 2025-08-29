/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  stepperDecrement,
  stepperIncrement,
} from "../../lib/forms/number-input";
import Typography from "../typography/index";

import styles from "./autosize-input.module.scss";

import type { HTMLAttributes } from "react";

const copyStyles = (styles: CSSStyleDeclaration, node: HTMLElement) => {
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
};

const FORBIDDEN_SYMBOLS = new Set(["+", "-", "ArrowUp", "ArrowDown"]);

export interface IAutosizeInputProps {
  floatingElement?: React.ReactNode;
  gap?: number;
  inputClassName?: string;
  minWidth?: number;
  onAutosize?: (newWidth: string | number) => any;
  strictInputLimit?: boolean;
  tertiaryPlaceholder?: boolean;
}

export type AutosizeInputProps = IAutosizeInputProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const AutosizeInput: React.FC<AutosizeInputProps> = ({
  minWidth,
  gap = 2,
  onAutosize,
  inputClassName,
  tertiaryPlaceholder,
  floatingElement,
  strictInputLimit = false,
  ...props
}) => {
  const sizerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  const [inputWidth, setInputWidth] = useState(minWidth);

  const [clientInputMode, setClientInputMode] =
    useState<HTMLAttributes<HTMLInputElement>["inputMode"]>("text");

  const isInputFilled = props.value || props.value === 0;

  const {
    step,
    min,
    max,
    value,
    placeholder,
    defaultValue,
    autoFocus,
    className,
    style,
    inputMode,
  } = props;

  const propsForHelpers = { max, min, step };

  const decimal = useMemo(() => {
    let result = 0;

    if (step && step.toString().includes(".")) {
      result = step.toString().split(".").pop()?.length || 0;
    }

    return result;
  }, [value, step]);

  const updateInputWidth = () => {
    if (!sizerRef.current || sizerRef.current.scrollWidth === undefined) {
      return;
    }

    let newInputWidth;

    // + 2 is added to stabilize input, without it text goes to the left sometimes
    newInputWidth =
      placeholder && !value
        ? Math.max(sizerRef.current.scrollWidth) + 2
        : sizerRef.current.scrollWidth + 2;

    if (minWidth && newInputWidth < minWidth) {
      newInputWidth = minWidth;
    }

    if (newInputWidth !== inputWidth) {
      setInputWidth(newInputWidth);
      onAutosize?.(newInputWidth);
    }
  };

  const copyInputStyles = () => {
    if (!window.getComputedStyle) {
      return;
    }

    const inputStyles =
      inputRef.current && window.getComputedStyle(inputRef.current);

    if (!inputStyles) {
      return;
    }

    if (sizerRef.current) {
      copyStyles(inputStyles, sizerRef.current);
    }
  };

  const sizerValue = [defaultValue, value, ""].reduce(
    (previousValue, currentValue) => {
      if (previousValue !== null && previousValue !== undefined) {
        return previousValue;
      }

      return currentValue;
    },
  );

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (props.type !== "number") return;

    if (FORBIDDEN_SYMBOLS.has(e.key)) e.preventDefault();

    // if (!props.value) return;

    const valueString = props?.value?.toString();
    const isNegative = valueString?.startsWith("-");
    let newValue;

    if (e.key === "-" && !isNegative) newValue = `-${value}`;
    else if (e.key === "+" && isNegative) newValue = valueString?.slice(1);
    else if (e.key === "ArrowUp" && inputRef?.current?.value)
      newValue = stepperIncrement({
        decimal,
        inputValue: inputRef?.current?.value,
        props: propsForHelpers,
      });
    else if (e.key === "ArrowDown" && inputRef?.current?.value)
      newValue = stepperDecrement({
        decimal,
        inputValue: inputRef?.current?.value,
        props: propsForHelpers,
      });

    if (newValue) {
      props.onChange?.({
        target: { value: newValue },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.value !== "-") {
      const value = Number(e.target.value);

      if (props.type === "number" && Number.isNaN(value)) return;

      if (strictInputLimit && (value < Number(min) || value > Number(max))) {
        return;
      }
    }

    props.onChange?.(e);
  };

  useEffect(() => {
    copyInputStyles();
  }, [wrapperRef.current]);

  useLayoutEffect(() => {
    updateInputWidth();
  }, [props, minWidth, inputClassName]);

  useEffect(() => {
    setClientInputMode(
      inputMode ?? (props.type === "number" ? "numeric" : "text"),
    );
  }, [inputMode, props.type]);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [inputRef.current]);

  return (
    <>
      <div
        ref={wrapperRef}
        className={clsx(
          styles.inputWrapper,
          {
            [styles.limitWidth]: isInputFilled,
          },
          className,
        )}
        style={{
          //@ts-ignore
          "--sizerWidth": `${placeholderRef.current?.scrollWidth}px`,
          gap: isInputFilled ? `${gap}px` : "0px",
          ...style,
        }}
      >
        <input
          {...props}
          ref={inputRef}
          value={value}
          type={props.type === "number" && !inputMode ? "text" : props.type}
          placeholder=""
          inputMode={clientInputMode}
          className={clsx(inputClassName, styles.input, {
            [styles.hiddenInput]: isInputFilled && !inputWidth,
          })}
          style={{
            boxSizing: "content-box",
            width: `${inputWidth || 2}px`,
          }}
          onKeyDown={handleKeydown}
          onChange={handleChange}
        />
        {!inputWidth && isInputFilled && (
          <span
            className={clsx(inputClassName, styles.input, styles.fakeInput)}
          >
            {value}
          </span>
        )}
        <Typography
          variant="p2_r"
          as="span"
          className={clsx(styles.placeholder, {
            [styles.empty]: !isInputFilled,
            [styles.tertiaryPlaceholder]: tertiaryPlaceholder,
          })}
          onClick={() => inputRef?.current?.focus()}
        >
          {isInputFilled ? floatingElement : placeholder}
        </Typography>
        <div ref={sizerRef} className={styles.sizer}>
          {sizerValue}
        </div>
      </div>
    </>
  );
};

export default AutosizeInput;
