<template>
  <div
    :class="[
      'notifier-notification',
      { 'notifier-notification-show-close-btn-on-hover': $props.options.showCloseButtonOnHover },
      $props.options.notificationClassList,
    ]"
    :style="[
      $props.options.notificationStyles,
      {
        backgroundColor,
        color: backgroundColor /* This style only for ::selection */,
        paddingBottom: (!$props.options.persistent && $props.options.showProgressBar ? 20 : 15) + 'px',
      },
    ]"
    @mouseenter="$props.options.persistent || !$props.options.pauseOnHover ? undefined : destroyTimer.pauseTimeout()"
    @mouseleave="$props.options.persistent || !$props.options.pauseOnHover ? undefined : destroyTimer.resumeTimeout()"
  >
    <div class="notifier-notification-container">
      <div class="notifier-notification-icon" v-if="$props.options.showIcon">
        <component :is="$props.options.icon" />
      </div>
      <div
        class="notifier-notification-content"
        :style="{
          marginLeft: $props.options.showIcon ? '15px' : 0,
          marginRight: $props.options.closable ? '15px' : 0,
        }"
      >
        <h5 class="notifier-notification-content-title" v-if="$props.options.title" v-html="$props.options.title" />
        <p
          class="notifier-notification-content-description"
          v-if="$props.options.description"
          v-html="$props.options.description"
        />
      </div>
      <div class="notifier-notification-close" v-if="$props.options.closable">
        <component :is="$props.options.closeButton" @vue3-notifier:click:close="$props.options.destroy()" />
      </div>
    </div>
    <div
      class="notifier-notification-progressbar"
      :style="{ transform: `scaleX(${(destroyTimer.value / $props.options.timeout) * 100}%)` }"
      v-if="!$props.options.persistent && $props.options.showProgressBar"
    />
  </div>
</template>

<script lang="ts">
import { computed, type PropType } from 'vue';

import type { NotifierOptions, NotifierExtraOptions, NotifierPluginOptions } from '../types';
import { getNotificationBackgroundColor } from '../utils';
import { useDestroyTimer } from '../hooks';

export default {
  name: 'DefaultNotifier',
  props: {
    options: {
      type: Object as PropType<Required<NotifierOptions & NotifierExtraOptions>>,
      required: true,
    },
    globalOptions: {
      type: Object as PropType<Required<NotifierPluginOptions>>,
      required: true,
    },
    greeting: String,
  },
  setup(props) {
    console.log(props.greeting);

    const backgroundColor = computed(() => getNotificationBackgroundColor(props.options.type));

    const destroyTimer = useDestroyTimer(props.options, props.globalOptions, () => {
      props.options.destroy();
    });

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
