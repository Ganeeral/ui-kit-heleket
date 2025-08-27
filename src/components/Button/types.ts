import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from 'react';
import type React from 'react';

/**
 * Defines the possible sizes for the button.
 */
export type ButtonSize = 's' | 'm' | 'l' | 'custom';

/**
 * Defines the possible appearances for the button.
 */
export type ButtonAppearance =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'stroked'
  | 'outline'
  | 'custom'
  | 'outline_small'
  | 'advertisement'
  | 'black'
  | 'stroked_light'
  | 'blacked';

/**
 * Base properties for the Button component.
 *
 * @template E - The type of the element to render, defaults to 'button'.
 */
export interface ButtonBaseProps<E extends ElementType = 'button'> {
  /** Alignment of the button content. */
  align?: 'center' | 'left' | 'right';
  /** Appearance style of the button. */
  appearance?: ButtonAppearance;
  /** The element type to render as the button. */
  as?: E;
  /** If true, the button will render as a child element. */
  asChild?: boolean;
  /** Additional class names for styling. */
  className?: string;
  /** Disables the button if true. */
  disabled?: boolean;
  /** If true, the button will take the full width of its container. */
  fullWidth?: boolean;
  /** Shows styles for loading if true. */
  isLoading?: boolean;
  /** Icon to display on the left side of the button content. */
  leftIcon?: ReactNode;
  /** Click event handler for the button. */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Icon to display on the right side of the button content. */
  rightIcon?: ReactNode;
  /** Size of the button. */
  size?: ButtonSize;
  /** Tab index for keyboard navigation. */
  tabIndex?: number;
}

/**
 * Properties for the Button component, including children and additional HTML attributes.
 *
 * @template E - The type of the element to render, defaults to 'button'.
 */
export type TButtonProps<E extends ElementType = 'button'> = PropsWithChildren<
  ButtonBaseProps<E> & Omit<ComponentPropsWithoutRef<E>, keyof ButtonBaseProps<E>>
>;
