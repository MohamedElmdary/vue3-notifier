import { createApp, inject, type Plugin } from 'vue';
import type { NotifierPluginOptions, NotifierService } from './types';

import { isBrowserEnv, normalizeNotifierPluginOptions } from './utils';
import { ERRORS, KEY } from './constants';
import NotifierApp from './components/NotifierApp.vue';

export function useNotifierPlugin(options?: NotifierPluginOptions): Plugin {
  const _options = normalizeNotifierPluginOptions(options);

  return {
    install(app) {
      if (!isBrowserEnv()) {
        if (_options.debug) {
          console.error(ERRORS.NOT_BROWSER_ENV);
        }

        if (!_options.silent) {
          throw new Error(ERRORS.NOT_BROWSER_ENV);
        }

        return;
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
