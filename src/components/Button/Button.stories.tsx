import { useState } from "react";

import type { Meta, StoryFn } from "@storybook/react";

import { Button } from "./Button";
import type { TButtonProps } from "./types";

const meta: Meta<typeof Button> = {
  argTypes: {
    align: {
      control: { type: "select" },
      description: "Выравнивание содержимого кнопки",
      options: ["center", "left", "right"],
    },
    appearance: {
      control: { type: "select" },
      description: "Внешний вид кнопки",
      options: [
        "primary",
        "custom",
        "secondary",
        "tertiary",
        "stroked",
        "outline",
        "outline_small",
        "footer",
        "advertisement",
        "special_green",
        "special_red",
      ],
    },
    children: {
      control: { type: "text" },
      description: "Текст или содержимое кнопки",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Отключение кнопки",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Кнопка на всю ширину контейнера",
    },
    isLoading: {
      control: { type: "boolean" },
      description: "Показывает индикатор загрузки",
    },
    leftIcon: {
      control: { type: "object" },
      description: "Иконка слева от текста кнопки",
    },
    rightIcon: {
      control: { type: "object" },
      description: "Иконка справа от текста кнопки",
    },
    size: {
      control: { type: "select" },
      description: "Размер кнопки",
      options: ["s", "m", "l", "custom"],
    },
    tabIndex: {
      control: { type: "number" },
      description: "Управление табуляцией",
    },
  },
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Кнопка с поддержкой различных внешних видов, размеров и иконок.",
      },
    },
  },
  tags: ["autodocs"],
  title: "Components/Button",
};

export default meta;

const Template: StoryFn<TButtonProps> = (args) => {
  const [loading, setLoading] = useState(args.isLoading || false);

  return (
    <Button {...args} isLoading={loading} onClick={() => setLoading(!loading)}>
      {args.children}
    </Button>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  appearance: "primary",
  children: "Primary Button",
  size: "m",
};

Primary.storyName = "Основная кнопка";
