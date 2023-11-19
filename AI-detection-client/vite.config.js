import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '~': path.resolve(__dirname + '/src'),
            '~routes': path.resolve(__dirname + '/src/routes'),
            '~Layout': path.resolve(__dirname + '/src/Layout'),
            '~Components': path.resolve(__dirname + '/src/Components'),
            '~Pages': path.resolve(__dirname + '/src/Pages'),
        },
    },
});
