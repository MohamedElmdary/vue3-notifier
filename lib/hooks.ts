import { computed, onMounted, ref } from 'vue';

export function useDestroyTimer(timeout: number, onFinish: () => void, paused = false) {
  const _timeout = ref(timeout);
  let animationFrame: ReturnType<typeof requestAnimationFrame> | null;

  if (!paused) {
    onMounted(decreaseTime);
  }

  function decreaseTime() {
    animationFrame = requestAnimationFrame(() => {
      if (_timeout.value <= 0) {
        return onFinish();
      }
      _timeout.value -= Math.max(1000 / 60, 0);
      decreaseTime();
    });
  }

  function pauseTimeout() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  function resumeTimeout() {
    if (!animationFrame) {
      decreaseTime();
    }
  }

  return computed(() => ({ value: _timeout.value, pauseTimeout, resumeTimeout }));
}
