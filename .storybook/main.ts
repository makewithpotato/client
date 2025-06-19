import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    async viteFinal(config) {
        return mergeConfig(config, {
            define: {
                'process.env': {},
            },
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, '../src'),
                    '@assets': path.resolve(__dirname, '../src/assets'),
                    '@components': path.resolve(__dirname, '../src/components'),
                    '@config': path.resolve(__dirname, '../src/config'),
                    '@constants': path.resolve(__dirname, '../src/constants'),
                    '@contexts': path.resolve(__dirname, '../src/contexts'),
                    '@hooks': path.resolve(__dirname, '../src/hooks'),
                    '@navigation': path.resolve(__dirname, '../src/navigation'),
                    '@screens': path.resolve(__dirname, '../src/screens'),
                    '@services': path.resolve(__dirname, '../src/services'),
                    '@styles': path.resolve(__dirname, '../src/styles'),
                    '@theme': path.resolve(__dirname, '../src/theme'),
                    '@utils': path.resolve(__dirname, '../src/utils'),
                },
            },
        });
    },
};

export default config;
