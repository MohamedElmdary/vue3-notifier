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
      <component :is="options$.hideAllButton" :plugin-options="options$" :notifier-service="service" />
    </div>

    <div
      v-for="notification in visibleNotifications"
      :key="notification.id"
      :style="{
        [options$.position.includes('bottom') ? 'marginTop' : 'marginBottom']: options$.notificationOffset + 'px',
      }"
    >
      <component
        :is="options$.component"
        :notification="notification"
        :plugin-options="options$"
        :notifier-service="service"
        v-bind="{ ...options$.props, ...notification.props }"
      />
    </div>

    <div key="hide-all-btn" v-if="!options$.position.includes('bottom') && showHideAllBtn">
      <component :is="options$.hideAllButton" :plugin-options="options$" :notifier-service="service" />
    </div>
  </transition-group>
</template>

<script lang="ts">
import { type Ref, computed, toRef, shallowRef } from 'vue';

import type { NotifierService, NotifierOptions, NotifierExtraOptions } from '../types';
import { makePluginOptionsProps } from '../props';
import {
  getPositionStyles,
  normalizeNotifierPluginOptions,
  normalizeNotifierOptions,
  getTransitionName,
} from '../utils';
import { leave } from '../animations';

let id = 1;

export default {
  name: 'NotifierApp',
  props: makePluginOptionsProps(),
  setup(props, ctx) {
    /**
     * Turn `props.options` into ref to allow modifying it from service
     */
    const options$ = toRef(props.pluginOptions);

    /**
     * Array including state of notifictions
     */
    const notifications = shallowRef([]) as Ref<Required<NotifierOptions & NotifierExtraOptions>[]>;

    const positionStyles = computed(() => getPositionStyles(options$.value.position, options$.value.containerOffset));

    const transitionName = computed(() => getTransitionName(options$.value.position));

    const showHideAllBtn = computed(() => notifications.value.length > 1 && options$.value.showHideAllButton);

    const visibleNotifications = computed(() => {
      if (options$.value.newOnTop) {
        return notifications.value.slice(0, options$.value.maxNotifictions);
      }
      return notifications.value.slice(-1 * options$.value.maxNotifictions);
    });

    const service: NotifierService = {
      updatePluginOptions(newOptions = {}) {
        options$.value = normalizeNotifierPluginOptions(newOptions, options$.value);
      },

      notify(newOptions) {
        const notification = normalizeNotifierOptions(newOptions, options$.value, {
          id: id++,
          destroy() {
            return service.destroy(notification.id);
          },
        });
        notifications.value = options$.value.newOnTop
          ? [notification, ...notifications.value]
          : [...notifications.value, notification];
        options$.value.debug &&
          options$.value.logger.success!(`Successfully add new notification with id(${notification.id})`);
        return notification;
      },

      destroy(id: number) {
        const index = notifications.value.findIndex((n) => n.id === id);
        if (index === -1) {
          options$.value.debug && options$.value.logger.warn!(`Notification with id(${id}) was not found`);
          return false;
        }
        const newNotifications = notifications.value.slice();
        newNotifications.splice(index, 1);
        notifications.value = newNotifications;
        options$.value.debug && options$.value.logger.success!(`Notification with id(${id}) is destroied`);
        return true;
      },

      destroyAll() {
        if (options$.value.debug) {
          if (notifications.value.length > 0) {
            options$.value.logger.success!('Successfully destroied all notifications');
          } else {
            options$.value.logger.warn!('No notifications were found to be destroied');
          }
        }

        notifications.value = [];
      },
    };
    ctx.expose(service);

    return {
      options$,
      notifications,
      positionStyles,
      leave,
      transitionName,
      showHideAllBtn,
      visibleNotifications,
      service,
    };
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
