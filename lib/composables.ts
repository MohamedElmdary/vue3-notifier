import type { Plugin } from 'vue';
import type { NotifierOptions, NotifierPluginOptions, NotifierService } from './types';

import { isBrowserEnv, normalizeNotifierPluginOptions, normalizeNotifierOptions } from './utils';
import { KEY } from './constants';

export function useNotifierPlugin(options?: NotifierPluginOptions): Plugin {
  const _options = normalizeNotifierPluginOptions(options);

  return {
    install(app) {
      if (!isBrowserEnv() && !_options.silent) {
        throw new Error('[vue3-notifier] Plugin setup requires browser environment.');
      }

      const service: NotifierService = {
        notify() {},
      };

      // Inject notifier service in main app
      app.provide(KEY, service);
    },
  };
}

export function useNotifier(options?: NotifierOptions) {
  const _options = normalizeNotifierOptions(options);
}
