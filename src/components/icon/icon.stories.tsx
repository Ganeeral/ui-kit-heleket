import type { Meta, StoryObj } from "@storybook/react";

import type { CSSVariables } from "../types/css-variables";
import { CSS_VARIABLES_META } from "../types/css-variables";
// import type { AnyIconName } from "../index";

import { Icon, type AnyIconName } from "./icon";
import Typography from "../typography/typography";
import { SPRITES_META } from "./icon.types";

interface IconGalleryProps {
  iconColor: CSSVariables | undefined;
  icons: AnyIconName[];
}

const IconGallery = ({ icons, iconColor }: IconGalleryProps) => (
  <div
    style={{
      display: "grid",
      gap: 10,
      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 100px))",
      justifyContent: "center",
      padding: "20px",
      width: "100%",
    }}
  >
    {icons.map((iconName) => (
      <div
        key={iconName}
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          border: "2px solid #ddd",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          height: 100,
          justifyContent: "center",
          padding: "5px",
          textAlign: "center",
          width: 100,
        }}
      >
        <Icon color={iconColor} name={iconName} />
        <div
          style={{
            color: "#333",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          <Typography variant="p3_sb">
            {iconName.split("/")?.[0] ?? ""}
          </Typography>
          {iconName.split("/")?.[1] ?? ""}
        </div>
      </div>
    ))}
  </div>
);

const iconGroups: Record<string, AnyIconName[]> = Object.keys(
  SPRITES_META
).reduce((acc, key) => {
  acc[key] = Object.keys(
    SPRITES_META[key as keyof typeof SPRITES_META].items
  ).map((icon) => `${key}/${icon}` as AnyIconName);

  return acc;
}, {} as Record<string, AnyIconName[]>);

const meta: Meta<typeof IconGallery> = {
  argTypes: {
    iconColor: {
      control: {
        options: Object.keys(CSS_VARIABLES_META),
        type: "select",
      },
      defaultValue: "special_green",
      description: "Цвет иконок",
    },
  },
  component: IconGallery,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  title: "Components/IconGallery",
};

export default meta;

type Story = StoryObj<typeof IconGallery>;

export const AllIcons: Story = {
  render: (args: any) => (
    <div
      style={{
        padding: 10,
        width: "100%",
      }}
    >
      {Object.entries(iconGroups).map(([groupName, icons]) => (
        <div
          key={groupName}
          style={{
            width: "100%",
          }}
        >
          <Typography variant="h6_sb">{groupName}</Typography>
          <IconGallery iconColor={args.iconColor} icons={icons} />
        </div>
      ))}
    </div>
  ),
};
