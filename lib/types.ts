import type { Component, Plugin } from 'vue';

export interface NotifierPluginOptions {
  /**
   * A number in ms that indicates the time before the notifiction gets destroied.
   * @default 3_000
   */
  timeout?: number;

  /**
   * A vue component which will be rendered as a notifiction.
   * This component will recive a some props will be discussed later.
   */
  component?: Component;

  /**
   * Props to pass to component.
   */
  props?: Record<string, any>;

  /**
   * A set of plugins that might be injected to your app.
   * This option is extremely useful when dealing with ui framework (e.g vuetify)
   *
   * @default []
   */
  plugins?: Plugin[];

  /**
   * Toggle progress bar visability based on it's value.
   * true -> shown, false -> hidden
   * @default false
   */
  showProgressBar?: boolean;

  /**
   * Toggle close button
   * true -> shown, false -> hidden
   * @default true
   */
  closable?: boolean;

  /**
   * Setting pause on hover to true will stop counting down to destroy the notifiction.
   * This might be useful to give the user time to read what is written on the notifiction.
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Where should the notifictions' container lays.
   * Note: "top" = "top center" & "bottom" = "bottom center"
   * @default "bottom right"
   */
  position?: `${'top' | 'bottom'}${'' | ' center' | ' left' | ' right'}`;

  /**
   * A vue component that will be used as a close button.
   */
  closeButton?: Component;

  /**
   * Toggle showing close button unless you hover the notifiction.
   * true -> show only on hover, false -> also will be shown
   */
  showCloseButtonOnHover?: boolean;

  /**
   * Add some logging if enabled.
   */
  debug?: boolean;

  /**
   * Avoid throwing error while initializing if something went wrong.
   */
  silent?: boolean;
}

export interface NotifierOptions extends Omit<NotifierPluginOptions, 'position' | 'plugins' | 'debug' | 'silent'> {
  /**
   * Toggle icon visability.
   * true -> shown, false -> hidden
   * @default true
   */
  showIcon?: boolean;

  /**
   * Icon to show if showIcon is true
   */
  icon?: Component;

  /**
   * Type of the notifiction to be shown.
   * @default 'default'
   */
  type?: 'default' | 'info' | 'warning' | 'success' | 'error';

  /**
   * Text to be render in notifiction supports html.
   */
  text?: string;
}

export interface NotifierService {
  notify(): void;
}
