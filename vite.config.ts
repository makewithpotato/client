import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@config': path.resolve(__dirname, './src/config'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@contexts': path.resolve(__dirname, './src/contexts'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@navigation': path.resolve(__dirname, './src/navigation'),
            '@screens': path.resolve(__dirname, './src/screens'),
            '@services': path.resolve(__dirname, './src/services'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@theme': path.resolve(__dirname, './src/theme'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
});
