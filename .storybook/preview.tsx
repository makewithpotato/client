import React from 'react';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../src/theme/theme';
import GlobalStyle from '../src/theme/GlobalStyle';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <GlobalStyle />
                        <Story />
                    </BrowserRouter>
                </ThemeProvider>
            </QueryClientProvider>
        ),
    ],
};

export default preview;
