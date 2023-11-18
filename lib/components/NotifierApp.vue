<template>
  <transition-group
    :name="transitionName"
    tag="section"
    :style="[positionStyles, { width: options$.containerWidth + 'px', zIndex: 9999999 }, options$.containerStyles]"
    :class="['vue3-notifier-container', options$.containerClassList]"
    v-bind="{
      onLeave: transitionName.includes('center') ? undefined : leave(options$.position.includes('left')),
    }"
  >
    <div key="hide-all-btn" v-if="options$.position.includes('bottom') && showHideAllBtn">
      <component :is="options$.hideAllButton" :service="service" />
    </div>

    <div
      v-for="notification in notifications"
      :key="notification.id"
      :style="{
        [options$.position.includes('bottom') ? 'marginTop' : 'marginBottom']: options$.notificationOffset + 'px',
      }"
    >
      <component :is="options$.component" :options="notification" />
    </div>

    <div key="hide-all-btn" v-if="!options$.position.includes('bottom') && showHideAllBtn">
      <component :is="options$.hideAllButton" :service="service" />
    </div>
  </transition-group>
</template>

<script lang="ts">
import { type PropType, type Ref, computed, toRef, shallowRef } from 'vue';
import { leave } from '../animations';

import type { NotifierPluginOptions, NotifierService, NotifierOptions, NotifierExtraOptions } from '../types';
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
    const options$ = toRef(props.options) as unknown as Ref<Required<NotifierPluginOptions>>;

    /**
     * Array including state of notifictions
     */
    const notifications = shallowRef([]) as Ref<Required<NotifierOptions & NotifierExtraOptions>[]>;

    const positionStyles = computed(() => getPositionStyles(options$.value.position, options$.value.containerOffset));

    const transitionName = computed(() => getTransitionName(options$.value.position));

    const showHideAllBtn = computed(() => notifications.value.length > 1 && options$.value.showHideAllButton);

    const service: NotifierService = {
      updatePluginOptions(newOptions = {}) {
        options$.value = normalizeNotifierPluginOptions(newOptions, options$.value);
      },

      notify(newOptions) {
        const notification = normalizeNotifierOptions(newOptions, options$.value, {
          id: id++,
          destroy() {
            notifications.value = notifications.value.filter((n) => n !== notification);
          },
        });
        notifications.value = [...notifications.value, notification];
        return notification;
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

    return { options$, notifications, positionStyles, leave, transitionName, showHideAllBtn, service };
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

.vue3-notifier-notifications-list-center-leave-to,
.vue3-notifier-notifications-list-center-enter-from {
  opacity: 0;
}

.vue3-notifier-notifications-list-center-leave-from,
.vue3-notifier-notifications-list-center-enter-to {
  opacity: 1;
}

.vue3-notifier-notifications-list-left-move,
.vue3-notifier-notifications-list-move,
.vue3-notifier-notifications-list-center-move,
.vue3-notifier-notifications-list-center-enter-active,
.vue3-notifier-notifications-list-center-leave-active {
  transition: all 0.5s ease;
}

.vue3-notifier-notifications-list-center-leave-active {
  position: absolute;
  width: 100%;
}
</style>
