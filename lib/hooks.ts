import { computed, onMounted, ref, onBeforeUnmount } from 'vue';

import { NotifierExtraOptions, NotifierOptions, NotifierPluginOptions } from './types';

export function useDestroyTimer(
  options: Required<NotifierOptions & NotifierExtraOptions>,
  globalOptions: Required<NotifierPluginOptions>,
  onFinish: () => void,
) {
  let _destroied = false;

  const _timeout = ref(options.timeout);
  let animationFrame: ReturnType<typeof requestAnimationFrame> | null;

  if (!options.persistent) {
    globalOptions.debug && globalOptions.logger.info!(`Timeout for notification with id(${options.id}) is started`);
    onMounted(decreaseTime);
  }

  function decreaseTime() {
    if (_destroied) return;

    animationFrame = requestAnimationFrame(() => {
      if (_timeout.value <= 0) {
        globalOptions.debug &&
          globalOptions.logger.info!(`Timeout for notification with id(${options.id}) is finished`);
        return onFinish();
      }
      _timeout.value -= Math.max(1000 / 60, 0);
      decreaseTime();
    });
  }

  function pauseTimeout() {
    if (animationFrame) {
      globalOptions.debug && globalOptions.logger.info!(`Timeout for notification with id(${options.id}) is paused`);
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  function resumeTimeout() {
    if (_destroied) return;

    if (!animationFrame) {
      globalOptions.debug && globalOptions.logger.info!(`Timeout for notification with id(${options.id}) is resumed`);
      decreaseTime();
    }
  }

  onBeforeUnmount(() => (_destroied = true));

  return computed(() => ({ value: _timeout.value, pauseTimeout, resumeTimeout }));
}
