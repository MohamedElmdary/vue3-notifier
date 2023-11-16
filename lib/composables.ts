import type { Plugin } from 'vue';
import type { NotifierOptions } from './types';

export function useNotifierPlugin(options?: NotifierOptions): Plugin {
  return {
    install(app) {
      console.log({ app, options });
    },
  };
}
