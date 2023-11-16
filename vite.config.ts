import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

function defineBuild() {
  return defineConfig({
    plugins: [vue(), dts()],
    build: {
      lib: {
        entry: resolve(__dirname, 'lib/index.ts'),
        name: 'vue3-notifier',
        fileName: 'vue3-notifier',
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  });
}

function defineDev() {
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  });
}

export default () => {
  if (process.env.NODE_ENV === 'production') {
    return defineBuild();
  }

  return defineDev();
};
