import type { IAutosizeInputProps } from '../autosize-input/autosize-input';
import type { Variant } from '../../../dist/components/typography/types';
import type { ChangeEvent, ReactNode, JSX } from 'react';

export type Variants = 'normal' | 'compact';

export interface IInputProps extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  autofocus?: boolean;
  autosize?: boolean;
  autosizeProps?: IAutosizeInputProps;
  blockRight?: ReactNode;
  decimal?: number;
  error?: string;
  hintText?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  label?: string;
  labelTextClassName?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  rightLabel?: string | JSX.Element;
  trim?: boolean;
  variant?: Variants;
}

export interface TypographyProps {
  variant: Variant;
}

interface IVariantsTypography {
  error: TypographyProps;
  label: TypographyProps;
}

const errorBase: Pick<IVariantsTypography, 'error'> = {
  error: {
    variant: 'p3_r',
  },
};

export const variantsTypography: Record<Variants, IVariantsTypography> = {
  compact: {
    label: {
      variant: 'p3_sb',
    },
    ...errorBase,
  },
  normal: {
    label: {
      variant: 'p3_sb',
    },
    ...errorBase,
  },
};
