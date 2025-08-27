/** @type { import('@storybook/react-vite').StorybookConfig } */
import { mergeConfig } from "vite";
import { resolve } from "path";
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          src: resolve(__dirname, "../src"),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "src/core/styles/mixins.scss" as *;`,
          },
        },
      },
    });
  },
};
export default config;
