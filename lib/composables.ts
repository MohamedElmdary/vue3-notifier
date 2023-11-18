import { createApp, inject, type Plugin } from 'vue';

import type { NotifierPluginOptions, NotifierService } from './types';
import { isBrowserEnv, normalizeNotifierPluginOptions, getKey } from './utils';
import { ERRORS } from './constants';
import { logger } from './logger';

import NotifierApp from './components/NotifierApp.vue';

export function useNotifierPlugin(options?: NotifierPluginOptions): Plugin {
  const _options = normalizeNotifierPluginOptions(options);

  return {
    install(app) {
      if (!isBrowserEnv()) {
        _options.debug && logger.error(ERRORS.NOT_BROWSER_ENV);

        if (!_options.silent) {
          throw new Error(ERRORS.NOT_BROWSER_ENV);
        }

        return;
      }

      // Create 2nd app to serve notifications
      const notifierApp = createApp(NotifierApp, { options: _options });
      _options.plugins.forEach(notifierApp.use);
      notifierApp.mount(document.body.appendChild(document.createElement('div')));

      // Inject notifier service in main app
      app.provide(getKey(_options.id), notifierApp._instance!.exposed);
    },
  };
}

/**
 * ID is targeting specific app
 * @param { string } id
 */
export function useNotifier(id: string = 'default') {
  return inject(getKey(id)) as NotifierService;
}
