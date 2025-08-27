import type { ReactNode } from 'react';

type TDisplayVariant = 'display_large' | 'display_medium';

type THeadlineVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5_r'
  | 'h5_b'
  | 'h5_sb'
  | 'h6_sb'
  | 'h6_r'
  | 'h6_b';

export type TParagraphVariant =
  | 'p1_sb'
  | 'p1_r'
  | 'p2_sb'
  | 'p2_m'
  | 'p2_r'
  | 'p3_sb'
  | 'p3_m'
  | 'p3_r';

type TButtonVariant = 'button' | 'small_button';

type TLinkVariant = 'link' | 'link_small';

type TOtherVariant = 'code' | 'tapBar_menu' | 'tag' | 'c1_sb' | 'c1_r';

export type Variant =
  | TDisplayVariant
  | THeadlineVariant
  | TParagraphVariant
  | TButtonVariant
  | TLinkVariant
  | TOtherVariant;

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'fullWidth' | 'none';

export type TextDecoration = 'none' | 'underline' | 'overline' | 'lineThrough';

export type TextWrap = 'balance' | 'nowrap' | 'wrap' | 'pretty';

export interface ITypographyProps<T extends keyof HTMLElementTagNameMap = 'span'> {
  children: ReactNode;
  variant: Variant;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  fontWeight?: FontWeight;
  htmlProps?: React.DetailsHTMLAttributes<HTMLElement>;
  isIgnoreMediaQuery?: boolean;
  isIgnoreRtl?: boolean;
  onClick?: React.MouseEventHandler<HTMLElementTagNameMap[T]>;
  textDecoration?: TextDecoration;
  textTransform?: TextTransform;
  textWrap?: TextWrap;
}

export type ITypographyPropsShared = Omit<ITypographyProps, 'children' | 'variant'>;
