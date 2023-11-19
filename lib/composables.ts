import { createApp, inject, type Plugin } from 'vue';

import type { NotifierPluginOptions, NotifierService } from './types';
import { isBrowserEnv, normalizeNotifierPluginOptions, getKey } from './utils';

import NotifierApp from './components/NotifierApp.vue';

export function useNotifierPlugin(options?: NotifierPluginOptions): Plugin {
  const _options = normalizeNotifierPluginOptions(options);

  return {
    install(app) {
      if (!isBrowserEnv()) {
        _options.debug && _options.logger.error!('Plugin setup requires browser environment');

        if (!_options.silent) {
          throw new Error('Plugin setup requires browser environment');
        }

        return;
      }

      // Create 2nd app to serve notifications
      _options.debug && _options.logger.info!(`Start initializing plugin for project(${_options.id})`);
      const notifierApp = createApp(NotifierApp, { pluginOptions: _options });
      _options.plugins.forEach(notifierApp.use);
      notifierApp.mount(document.body.appendChild(document.createElement('div')));

      // Inject notifier service in main app
      app.provide(getKey(_options.id), notifierApp._instance!.exposed);
      _options.debug && _options.logger.info!(`Plugin is initialized and ready to use for project(${_options.id})`);
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
