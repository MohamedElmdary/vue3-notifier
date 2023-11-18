import { type StyleValue, markRaw } from 'vue';

import type { NotifierOptions, NotifierPluginOptions, NotifierExtraOptions } from './types';
import { logger } from './logger';

import DefaultNotifier from './components/DefaultNotifier.vue';
import DefaultCloseBtn from './components/DefaultCloseBtn.vue';
import DefaultIcon from './components/icons/DefaultIcon.vue';
import InfoIcon from './components/icons/InfoIcon.vue';
import WarningIcon from './components/icons/WarningIcon.vue';
import ErrorIcon from './components/icons/ErrorIcon.vue';
import SuccessIcon from './components/icons/SuccessIcon.vue';

export function isBrowserEnv(): boolean {
  return (
    typeof document !== 'undefined' &&
    typeof document === 'object' &&
    'body' in document &&
    document.body instanceof HTMLElement
  );
}

function pickBoolean(defaultValue: boolean, ...args: (boolean | undefined)[]): boolean {
  for (const arg of args) {
    if (typeof arg === 'boolean') {
      return arg;
    }
  }
  return defaultValue;
}

export function normalizeNotifierPluginOptions(
  options: NotifierPluginOptions = {},
  defaultOptions: NotifierPluginOptions = {},
): Required<NotifierPluginOptions> {
  return {
    timeout: options.timeout || defaultOptions.timeout || 3_000,
    component: markRaw(options.component || defaultOptions.component || DefaultNotifier),
    props: options.props || defaultOptions.props || {},
    plugins: options.plugins || defaultOptions.plugins || [],
    showProgressBar: pickBoolean(false, options.showProgressBar, defaultOptions.showProgressBar),
    closable: pickBoolean(true, options.closable, defaultOptions.closable),
    pauseOnHover: pickBoolean(true, options.pauseOnHover, defaultOptions.pauseOnHover),
    position: options.position || defaultOptions.position || 'bottom right',
    closeButton: markRaw(options.closeButton || defaultOptions.closeButton || DefaultCloseBtn),
    showCloseButtonOnHover: pickBoolean(false, options.showCloseButtonOnHover, defaultOptions.showCloseButtonOnHover),
    debug: pickBoolean(false, options.debug, defaultOptions.debug),
    silent: pickBoolean(false, options.silent, defaultOptions.silent),
    persistent: pickBoolean(false, options.persistent, defaultOptions.persistent),
    newOnTop: pickBoolean(false, options.newOnTop, defaultOptions.newOnTop),
    maxNotifictions: options.maxNotifictions || defaultOptions.maxNotifictions || 10,
    logger: { ...logger, ...(options.logger || defaultOptions.logger || {}) },
    containerOffset: options.containerOffset || defaultOptions.containerOffset || 20,
    containerClassList: options.containerClassList || defaultOptions.containerClassList || [],
    containerWidth: options.containerWidth || defaultOptions.containerWidth || 350,
    containerStyles: options.containerStyles || defaultOptions.containerStyles || {},
    notificationClassList: options.notificationClassList || defaultOptions.notificationClassList || [],
    notificationOffset: options.notificationOffset || defaultOptions.notificationOffset || 20,
    notificationStyles: options.notificationStyles || defaultOptions.notificationStyles || {},
  };
}

export function normalizeNotifierOptions(
  options: NotifierOptions = {},
  defaultOptions: NotifierOptions = {},
  extraOptions: NotifierExtraOptions = {},
): Required<NotifierOptions & NotifierExtraOptions> {
  const _options = normalizeNotifierPluginOptions(options, defaultOptions);

  const type = options.type || defaultOptions.type || 'default';

  return {
    id: extraOptions.id || -1,
    destroy: extraOptions.destroy || (() => null),
    timeout: _options.timeout,
    component: _options.component,
    props: _options.props,
    showProgressBar: _options.showProgressBar,
    closable: _options.closable,
    pauseOnHover: _options.pauseOnHover,
    closeButton: _options.closeButton,
    showCloseButtonOnHover: _options.showCloseButtonOnHover,
    icon: markRaw(options.icon || defaultOptions.icon || getNotificationIcon(type) || DefaultIcon),
    showIcon: pickBoolean(true, options.showIcon, defaultOptions.showIcon),
    title: options.title || defaultOptions.title || '',
    description: options.description || defaultOptions.description || '',
    type,
    notificationClassList: _options.notificationClassList,
    notificationStyles: _options.notificationStyles,
    persistent: _options.persistent,
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

export function getNotificationBackgroundColor(type: NotifierOptions['type']): string {
  switch (type) {
    case 'info':
      return '#2196f3';

    case 'error':
      return '#c51162';

    case 'success':
      return '#4caf50';

    case 'warning':
      return '#fb8c00';

    default:
      return '#424242';
  }
}

export function getNotificationIcon(type: NotifierOptions['type']): NotifierOptions['icon'] {
  switch (type) {
    case 'info':
      return InfoIcon;

    case 'error':
      return ErrorIcon;

    case 'success':
      return SuccessIcon;

    case 'warning':
      return WarningIcon;

    default:
      return DefaultIcon;
  }
}
