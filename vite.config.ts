/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import type { UserConfig as VitestUserConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module 'vite' {
  export interface UserConfig {
    test?: VitestUserConfig['test'];
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom', // Simulated environment for React tests in the browser
    setupFiles: resolve(__dirname, './setupTests.ts'), // Correct path to setup file
  },
});
