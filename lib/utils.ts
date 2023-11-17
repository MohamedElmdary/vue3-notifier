import { DeepRequired as DR } from 'utility-types';

import { NotifierOptions, NotifierPluginOptions } from './types';
import { logger } from './logger';

import DefaultNotifier from './components/DefaultNotifier.vue';
import DefaultCloseBtn from './components/DefaultCloseBtn.vue';
import DefaultIcon from './components/icons/DefaultIcon.vue';

export function isBrowserEnv(): boolean {
  return (
    typeof document !== 'undefined' &&
    typeof document === 'object' &&
    'body' in document &&
    document.body instanceof HTMLElement
  );
}

export function normalizeNotifierPluginOptions(options: NotifierPluginOptions = {}): DR<NotifierPluginOptions> {
  return {
    timeout: options.timeout || 3_000,
    component: options.component || DefaultNotifier,
    props: options.props || {},
    plugins: options.plugins || [],
    showProgressBar: options.showProgressBar || false,
    closable: options.closable || true,
    pauseOnHover: options.pauseOnHover || true,
    position: options.position || 'bottom right',
    closeButton: options.closeButton || DefaultCloseBtn,
    showCloseButtonOnHover: options.showCloseButtonOnHover || false,
    debug: options.debug || false,
    silent: options.silent || false,
    persistent: options.persistent || false,
    newOnTop: options.newOnTop || false,
    maxNotifictions: options.maxNotifictions || 10,
    logger: { ...logger, ...(options.logger || {}) },
  };
}

export function normalizeNotifierOptions(options: NotifierOptions = {}): DR<NotifierOptions> {
  const _options = normalizeNotifierPluginOptions(options);

  return {
    timeout: _options.timeout,
    component: _options.component,
    props: _options.props,
    showProgressBar: _options.showProgressBar,
    closable: _options.closable,
    pauseOnHover: _options.pauseOnHover,
    closeButton: _options.closeButton,
    showCloseButtonOnHover: _options.showCloseButtonOnHover,
    icon: options.icon || DefaultIcon,
    showIcon: options.showIcon || true,
    text: options.text || '',
    type: options.type || 'default',
  };
}
