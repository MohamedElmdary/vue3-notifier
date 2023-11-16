import type { Plugin } from 'vue';
import type { NotifierPluginOptions } from './types';

import { KEY } from './constants';

export function useNotifierPlugin(options?: NotifierPluginOptions): Plugin {
  return {
    install(app) {},
  };
}
