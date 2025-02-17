// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@nuxtjs/storybook';

const config: StorybookConfig = {
  // Required
  framework: {
    name: "@storybook-vue/nuxt",
    options: {},
  },
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  // Optional
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  core: {
    enableCrashReports: false
  }
};

export default config;
