import type { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

export default {
  title: "components/Button",
  component: Button,
  args: {
    children: "Content",
  },
} as Meta<ButtonStoryProps>;

type ButtonStoryProps = Pick<ButtonProps, "children">;

export const ButtonStoryTemplate: StoryFn<ButtonStoryProps> = ({ ...args }) => (
  <Button {...args} />
);

ButtonStoryTemplate.storyName = "Button";
