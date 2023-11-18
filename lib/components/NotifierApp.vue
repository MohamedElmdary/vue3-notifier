<template>
  <transition-group
    appear
    :name="transitionName"
    tag="section"
    :style="[positionStyles, { width: $props.options.containerWidth + 'px' }, $props.options.containerStyles]"
    :class="['vue3-notifier-container', $props.options.containerClassList]"
    @leave="(el, done) => leave($props.options.position.includes('left'))(el, done)"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :style="{ marginTop: $props.options.notificationOffset + 'px' }"
    >
      <component :is="$props.options.component" :options="notification" />
    </div>
  </transition-group>
</template>

<script lang="ts">
import { type PropType, type Ref, computed, toRef, shallowRef } from 'vue';
import { leave } from '../animations';

import type { NotifierPluginOptions, NotifierService, NotifierOptions } from '../types';
import {
  getPositionStyles,
  normalizeNotifierPluginOptions,
  normalizeNotifierOptions,
  getTransitionName,
} from '../utils';

let id = 1;

export default {
  name: 'NotifierApp',
  props: {
    options: {
      type: Object as PropType<Required<NotifierPluginOptions>>,
      required: true,
    },
  },
  setup(props, ctx) {
    /**
     * Turn `props.options` into ref to allow modifying it from service
     */
    const options = toRef(props.options) as unknown as Ref<Required<NotifierPluginOptions>>;

    /**
     * Array including state of notifictions
     */
    const notifications = shallowRef([]) as Ref<Required<NotifierOptions & { id: number }>[]>;

    const positionStyles = computed(() => getPositionStyles(options.value.position, options.value.containerOffset));

    const transitionName = computed(() => getTransitionName(options.value.position));

    const service: NotifierService = {
      updatePluginOptions(newOptions = {}) {
        options.value = normalizeNotifierPluginOptions(newOptions, options.value);
      },

      notify(newOptions) {
        const notification = normalizeNotifierOptions(newOptions, options.value, {
          id: id++,
          destroy() {
            notifications.value = notifications.value.filter((n) => n !== notification);
          },
        });
        notifications.value = [...notifications.value, notification];
        return {};
      },

      destroy(id: number) {
        const index = notifications.value.findIndex((n) => n.id === id);
        if (index === -1) {
          return false;
        }
        const newNotifications = notifications.value.slice();
        newNotifications.slice(index, 1);
        notifications.value = newNotifications;
        return true;
      },

      destroyAll() {
        notifications.value = [];
      },
    };
    ctx.expose(service);

    return { notifications, positionStyles, leave, transitionName };
  },
};
</script>

<style scoped lang="scss">
.vue3-notifier-notifications-list-left-enter-from,
.vue3-notifier-notifications-list-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.vue3-notifier-notifications-list-left-enter-from {
  transform: translateX(-100%);
}

.vue3-notifier-notifications-list-left-enter-to,
.vue3-notifier-notifications-list-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.vue3-notifier-notifications-list-left-enter-active,
.vue3-notifier-notifications-list-enter-active {
  transition: all 0.5s ease;
}
</style>
