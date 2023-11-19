import type { PropType } from 'vue';
import type { NotifierExtraOptions, NotifierOptions, NotifierPluginOptions, NotifierService } from './types';

export function makePluginOptionsProps() {
  return {
    pluginOptions: {
      type: Object as PropType<Required<NotifierPluginOptions>>,
      required: true as const,
    },
  };
}

export function makeNotifierServiceProps() {
  return {
    notifierService: {
      type: Object as PropType<NotifierService>,
      required: true as const,
    },
  };
}

export function makeNotificationProps() {
  return {
    notification: {
      type: Object as PropType<Required<NotifierOptions & NotifierExtraOptions>>,
      required: true as const,
    },
  };
}

export function makeNotifierProps() {
  return {
    ...makePluginOptionsProps(),
    ...makeNotifierServiceProps(),
    ...makeNotificationProps(),
  };
}
