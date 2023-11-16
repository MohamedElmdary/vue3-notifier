import { NotifierOptions, NotifierPluginOptions } from './types';

export function isBrowserEnv(): boolean {
  return (
    typeof document !== 'undefined' &&
    typeof document === 'object' &&
    'body' in document &&
    document.body instanceof HTMLElement
  );
}

export function normalizeNotifierPluginOptions(options: NotifierPluginOptions = {}): Required<NotifierPluginOptions> {
  return {
    timeout: options.timeout || 3_000,
    component: options.component || {},
    props: options.props || {},
    plugins: options.plugins || [],
    showProgressBar: options.showProgressBar || false,
    closable: options.closable || true,
    pauseOnHover: options.pauseOnHover || true,
    position: options.position || 'bottom right',
    closeButton: options.closeButton || {},
    showCloseButtonOnHover: options.showCloseButtonOnHover || false,
    debug: options.debug || false,
    silent: options.silent || false,
  };
}

export function normalizeNotifierOptions(options: NotifierOptions = {}): Required<NotifierOptions> {
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
    icon: options.icon || {},
    showIcon: options.showIcon || true,
    text: options.text || '',
    type: options.type || 'default',
  };
}
