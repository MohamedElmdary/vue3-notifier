import type { Component, Plugin, StyleValue, VNode, VueElement, VueElementConstructor } from 'vue';

export type NotifierComponent = Component | VNode | VueElement | VueElementConstructor;

export interface NotifierPluginOptions<TProps extends object = Record<string, any>> {
  /**
   * This identifier should be used only while having more than one notifiction app
   * @default 'default'
   */
  id?: string;

  /**
   * A number in ms that indicates the time before the notifiction gets destroied.
   * @default 3_000
   */
  timeout?: number;

  /**
   * If it's true so it won't destroy notifictions.
   * @default false
   */
  persistent?: boolean;

  /**
   * If it's true so new notifictions should be pushed to top.
   * @default false
   */
  newOnTop?: boolean;

  /**
   * Max allowed number of notifictions to be shown at once on screen.
   * @default 3
   */
  maxNotifictions?: number;

  /**
   * A vue component which will be rendered as a notifiction.
   * This component will recive a some props will be discussed later.
   */
  component?: NotifierComponent;

  /**
   * Props to pass to component.
   */
  props?: TProps;

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
  position?: `${'top' | 'bottom'}${'' | ' center' | ' left' | ' right'}` | 'center' | 'center center';

  /**
   * A vue component that will be used as a close button.
   */
  closeButton?: NotifierComponent;

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

  /**
   * Logger which will be used in debug mode.
   */
  logger?: Partial<NotifierLogger>;

  /**
   * Offset between container holding notifications and the edges of the screen (in px)
   * @default 20
   */
  containerOffset?: number;

  /**
   * Container max width (in px)
   * @default 350
   */
  containerWidth?: number;

  /**
   * container class list
   * @default []
   */
  containerClassList?: string[];

  /**
   * container extra styles
   * @default {}
   */
  containerStyles?: StyleValue;

  /**
   * Notification offset (in px)
   * @default 20
   */
  notificationOffset?: number;

  /**
   * Notification class list
   * @default []
   */
  notificationClassList?: string[];

  /**
   * Notification extra styles
   * @default {}
   */
  notificationStyles?: StyleValue;

  /**
   * Hide all button component.
   */
  hideAllButton?: NotifierComponent;

  /**
   * Toggle shown for hide all button
   * true -> shown, false hidden
   * @default true
   */
  showHideAllButton?: boolean;
}

export interface NotifierOptions<TProps extends object = Record<string, any>>
  extends Omit<
    NotifierPluginOptions<TProps>,
    | 'position'
    | 'plugins'
    | 'debug'
    | 'silent'
    | 'newOnTop'
    | 'maxNotifictions'
    | 'logger'
    | 'containerOffset'
    | 'containerWidth'
    | 'containerClassList'
    | 'containerStyles'
    | 'notificationOffset'
    | 'id'
    | 'hideAllButton'
    | 'showHideAllButton'
  > {
  /**
   * Toggle icon visability.
   * true -> shown, false -> hidden
   * @default true
   */
  showIcon?: boolean;

  /**
   * Icon to show if showIcon is true
   */
  icon?: NotifierComponent;

  /**
   * Type of the notifiction to be shown.
   * @default 'default'
   */
  type?: 'default' | 'info' | 'warning' | 'success' | 'error';

  /**
   * Title to show on notifiction supports html.
   */
  title?: string;

  /**
   * Text to be render in notifiction supports html.
   */
  description?: string;
}

export interface NotifierExtraOptions {
  id?: number;
  destroy?(): boolean;
}

export interface NotifierService<TProps extends object = Record<string, any>> {
  updatePluginOptions(options?: NotifierPluginOptions<TProps>): void;
  notify(options?: NotifierOptions<TProps>): Required<NotifierOptions<TProps> & NotifierExtraOptions>;
  destroy(id: number): boolean;
  destroyAll(): void;
}

export interface NotifierLogger {
  info(...args: any[]): void;
  success(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}
