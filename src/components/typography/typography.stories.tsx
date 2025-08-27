import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./typography";
import type { Variant } from "./types";

const typographyVariants: Variant[] = [
  "display_large",
  "display_medium",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5_r",
  "h5_sb",
  "h5_b",
  "h6_r",
  "h6_sb",
  "h6_b",
  "p1_r",
  "p1_sb",
  "p2_r",
  "p2_m",
  "p2_sb",
  "p3_r",
  "p3_m",
  "p3_sb",
  "button",
  "small_button",
  "link",
  "link_small",
  "code",
  "tag",
  "c1_r",
  "c1_sb",
  "tapBar_menu",
];

const meta: Meta<typeof Typography> = {
  component: Typography,
  tags: ["autodocs"],
  title: "Components/Typography",
};

export default meta;

type Story = StoryObj<typeof Typography>;

const Template = () => (
  <div>
    {typographyVariants.map((variant) => (
      <div key={variant} style={{ marginBottom: "1rem" }}>
        <Typography variant={variant} textTransform="capitalize">
          {variant}
        </Typography>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  render: Template,
};
