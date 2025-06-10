import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from '@/contexts/query/QueryContext';
import { theme } from './theme/theme';
import GlobalStyle from './theme/GlobalStyle';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <JotaiProvider>
            <QueryClientProvider>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </JotaiProvider>
    </StrictMode>
);
