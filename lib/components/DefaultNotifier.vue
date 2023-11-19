<template>
  <div
    :class="[
      'notifier-notification',
      { 'notifier-notification-show-close-btn-on-hover': $props.notification.showCloseButtonOnHover },
      $props.notification.notificationClassList,
    ]"
    :style="[
      $props.notification.notificationStyles,
      {
        backgroundColor,
        color: backgroundColor /* This style only for ::selection */,
        paddingBottom: (!$props.notification.persistent && $props.notification.showProgressBar ? 20 : 15) + 'px',
      },
    ]"
    @mouseenter="
      $props.notification.persistent || !$props.notification.pauseOnHover ? undefined : destroyTimer.pauseTimeout()
    "
    @mouseleave="
      $props.notification.persistent || !$props.notification.pauseOnHover ? undefined : destroyTimer.resumeTimeout()
    "
  >
    <div class="notifier-notification-container">
      <div class="notifier-notification-icon" v-if="$props.notification.showIcon">
        <component :is="$props.notification.icon" />
      </div>
      <div
        class="notifier-notification-content"
        :style="{
          marginLeft: $props.notification.showIcon ? '15px' : 0,
          marginRight: $props.notification.closable ? '15px' : 0,
        }"
      >
        <h5
          class="notifier-notification-content-title"
          v-if="$props.notification.title"
          v-html="$props.notification.title"
        />
        <p
          class="notifier-notification-content-description"
          v-if="$props.notification.description"
          v-html="$props.notification.description"
        />
      </div>
      <div class="notifier-notification-close" v-if="$props.notification.closable">
        <component
          :is="$props.notification.closeButton"
          :notification="$props.notification"
          :plugin-options="$props.pluginOptions"
          :notifier-service="$props.notifierService"
        />
      </div>
    </div>
    <div
      class="notifier-notification-progressbar"
      :style="{ transform: `scaleX(${(destroyTimer.value / $props.notification.timeout) * 100}%)` }"
      v-if="!$props.notification.persistent && $props.notification.showProgressBar"
    />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';

import { makeNotifierProps } from '../props';
import { getNotificationBackgroundColor } from '../utils';
import { useDestroyTimer } from '../hooks';

export default {
  name: 'DefaultNotifier',
  props: makeNotifierProps(),
  setup(props) {
    console.log(props);

    const backgroundColor = computed(() => getNotificationBackgroundColor(props.notification.type));
    const destroyTimer = useDestroyTimer(props.notification, props.pluginOptions, props.notification.destroy);

    return { backgroundColor, destroyTimer };
  },
};
</script>

<style scoped lang="scss">
::selection {
  background-color: #333;
}

.notifier-notification {
  position: relative;
  overflow: hidden;
  width: 100%;
  font-family: sans-serif;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;

  &.notifier-notification-show-close-btn-on-hover {
    .notifier-notification-close {
      transition: opacity 0.3s ease;
      opacity: 0;
    }

    &:hover {
      .notifier-notification-close {
        opacity: 1;
      }
    }
  }

  * {
    box-sizing: inherit;
  }

  &-container {
    display: flex;
    color: white;
  }

  &-content {
    width: 100%;

    &-title {
      font-size: 19px;
      margin: 0;
      font-weight: bold;
    }

    &-description {
      margin: 5px 0 0;
      font-size: 15px;
      line-height: 20px;
    }
  }

  &-progressbar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: white;
    transform-origin: left;
  }
}
</style>
