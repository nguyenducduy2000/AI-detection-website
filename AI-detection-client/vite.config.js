/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd()); // Define and assign the "env" variable

    return defineConfig({
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
        define: {
            'process.env.VITE_BASE_URL': JSON.stringify(env.VITE_BASE_URL),
        },
    });
};
