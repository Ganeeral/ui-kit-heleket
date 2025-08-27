import { clsx } from 'clsx';
import styles from './typography.module.scss';
import type {
  FontWeight,
  ITypographyProps,
  TextDecoration,
  TextTransform,
  TextWrap,
} from './types';

const fontWeightMap: Record<FontWeight, string> = {
  100: styles.fontWeight_100,
  200: styles.fontWeight_200,
  300: styles.fontWeight_300,
  400: styles.fontWeight_400,
  500: styles.fontWeight_500,
  600: styles.fontWeight_600,
  700: styles.fontWeight_700,
  800: styles.fontWeight_800,
  900: styles.fontWeight_900,
};

const textTransformMap: Record<TextTransform, string> = {
  capitalize: styles.textTransform_capitalize,
  fullWidth: styles.textTransform_fullWidth,
  lowercase: styles.textTransform_lowercase,
  none: styles.textTransform_none,
  uppercase: styles.textTransform_uppercase,
};

const textDecorationMap: Record<TextDecoration, string> = {
  lineThrough: styles.textDecoration_lineThrough,
  none: styles.textDecoration_none,
  overline: styles.textDecoration_overline,
  underline: styles.textDecoration_underline,
};

const textWrapMap: Record<TextWrap, string> = {
  balance: styles.textWrap_balance,
  nowrap: styles.textWrap_nowrap,
  pretty: styles.textWrap_pretty,
  wrap: styles.textWrap_wrap,
};

/**
 * Typography Component
 *
 * React component for rendering text with customizable typography styles.
 *
 * @component
 * @example
 * // Example usage of Typography component
 * <Typography variant="h1" fontWeight={600}>
 *   Hello, World!
 * </Typography>
 *
 * @param {ReactNode} children - The content to be displayed within the Typography component.
 * @param {string} [className] - Additional CSS class names to apply to the component.
 * @param {keyof HTMLElementTagNameMap} [as] - HTML tag name to use for the Typography component (default is 'p').
 * @param {'primary' | 'black' | 'accent'} [color='primary'] - Color variant for the text.
 * @param {100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900} [fontWeight] - Font weight for the text.
 * @param {TextTransform} [textTransform='none'] - Text transformation style.
 * @param {TextDecoration} [textDecoration='none'] - Text decoration style.
 * @param {Variant} variant - Typography variant, e.g., 'h1', 'button', 'link'.
 *
 * @returns {JSX.Element} - Rendered Typography component.
 */

const Typography = <T extends keyof HTMLElementTagNameMap = 'span'>({
  as: Tag = 'p',
  textTransform = 'none',
  textDecoration = 'none',
  textWrap = 'wrap',
  fontWeight,
  variant,
  children,
  className,
  isIgnoreRtl = false,
  isIgnoreMediaQuery = false,
  htmlProps,
  onClick,
}: ITypographyProps<T>) => {
  const getClasses = clsx(styles.typography, styles[variant], className, {
    [fontWeightMap[fontWeight ?? 200]]:
      fontWeight && Object.prototype.hasOwnProperty.call(fontWeightMap, fontWeight),
    [textTransformMap[textTransform]]:
      Object.prototype.hasOwnProperty.call(textTransformMap, textTransform) &&
      textTransform !== 'none',
    [textDecorationMap[textDecoration]]:
      Object.prototype.hasOwnProperty.call(textDecorationMap, textDecoration) &&
      textDecoration !== 'none',
    [textWrapMap[textWrap]]:
      Object.prototype.hasOwnProperty.call(textWrapMap, textWrap) && textWrap !== 'wrap',
    [styles.disabled__rtl]: isIgnoreRtl,
    [styles.disabled__mediaQueryProps]: isIgnoreMediaQuery,
  });

  return (
    <Tag className={getClasses} onClick={onClick as React.MouseEventHandler<any>} {...htmlProps}>
      {children}
    </Tag>
  );
};

export default Typography;
