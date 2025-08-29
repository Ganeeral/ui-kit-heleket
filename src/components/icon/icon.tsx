import type { SVGProps } from "react";

import type { CSSVariables } from "../types/css-variables";
import { CSS_VARIABLES_META } from "../types/css-variables";

import { getIconMeta } from "../icon/lib/get-icon-meta";
import type { SpritesMap } from "./icon.types";

export type AnyIconName = {
  [Key in keyof SpritesMap]: IconName<Key>;
}[keyof SpritesMap];

export type IconName<Key extends keyof SpritesMap> =
  `${Key}/${SpritesMap[Key]}`;

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, "name" | "type"> {
  name: AnyIconName;
  color?: CSSVariables;
  fillColor?: CSSVariables;
  size?: 16 | 20 | 24 | 56 | number;
  strokeColor?: CSSVariables;
}

export const Icon = ({
  name,
  className,
  size,
  fillColor,
  strokeColor,
  color,
  ...props
}: IconProps) => {
  const { viewBox, filePath, iconName, defaultSize } = getIconMeta(name);

  const height = size ?? props.height ?? defaultSize.height;
  const width = size ?? props.width ?? defaultSize.width;

  return (
    <svg
      aria-hidden
      className={className}
      focusable="false"
      height={height}
      viewBox={viewBox}
      width={width}
      {...(color &&
        !fillColor &&
        !strokeColor && { color: CSS_VARIABLES_META[color] })}
      style={{
        ...(fillColor && { fill: CSS_VARIABLES_META[fillColor] }),
        ...(strokeColor && { stroke: CSS_VARIABLES_META[strokeColor] }),
      }}
      {...props}
    >
      <use href={`/ui-kit/sprites/${filePath}#${iconName}`} />
    </svg>
  );
};
