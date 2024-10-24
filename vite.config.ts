/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom', // Simulated environment for React tests in the browser
    setupFiles: resolve(__dirname, './setupTests.ts'), // Correct path to setup file
  },
});
