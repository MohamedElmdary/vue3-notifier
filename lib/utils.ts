import type { StyleValue } from 'vue';
import type { DeepRequired as DR } from 'utility-types';

import type { NotifierOptions, NotifierPluginOptions } from './types';
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
    containerOffset: options.containerOffset || 20,
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

export function getPositionStyles(position: NotifierPluginOptions['position'], offset: number): StyleValue {
  switch (position) {
    case 'top':
    case 'top center':
      return { position: 'fixed', top: offset + 'px', left: '50%', transform: 'translateX(-50%)' };

    case 'top left':
      return { position: 'fixed', top: offset + 'px', left: offset + 'px' };

    case 'top right':
      return { position: 'fixed', top: offset + 'px', right: offset + 'px' };

    case 'bottom':
    case 'bottom center':
      return { position: 'fixed', bottom: offset + 'px', left: '50%', transform: 'translateX(-50%)' };

    case 'bottom left':
      return { position: 'fixed', bottom: offset + 'px', left: offset + 'px' };

    case 'center':
    case 'center center':
      return { position: 'fixed', top: '50%', left: '50%', transform: 'translateX(-50%, -50)' };

    default:
      return { position: 'fixed', bottom: offset + 'px', right: offset + 'px' };
  }
}
