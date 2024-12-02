/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config = {
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['src/tests'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        'src/tests/**',
        'src/vite-env.d.ts',
        'playwright',
      ],
    },
  },
};

export default mergeConfig(defineConfig({}), config);
