import { createApp, inject, type Plugin } from 'vue';
import type { NotifierPluginOptions, NotifierService } from './types';

import { isBrowserEnv, normalizeNotifierPluginOptions } from './utils';
import { KEY } from './constants';
import NotifierApp from './components/NotifierApp.vue';

export function useNotifierPlugin(options?: NotifierPluginOptions): Plugin {
  const _options = normalizeNotifierPluginOptions(options);

  return {
    install(app) {
      if (!isBrowserEnv() && !_options.silent) {
        throw new Error('[vue3-notifier] Plugin setup requires browser environment.');
      }

      // Create 2nd app to serve notifications
      const notifierApp = createApp(NotifierApp);
      _options.plugins.forEach(notifierApp.use);
      notifierApp.mount(document.body.appendChild(document.createElement('div')));

      // Inject notifier service in main app
      app.provide(KEY, notifierApp._instance!.exposed);
    },
  };
}

export function useNotifier() {
  return inject(KEY) as NotifierService;
}
