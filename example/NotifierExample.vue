<template>NotifierExample</template>

<script lang="ts">
import { useNotifier } from '../lib';

export default {
  name: 'NotifierExample',
  setup() {
    const notifier = useNotifier();

    const notification = notifier.notify({
      text: 'hello world',
      type: 'warning',
    });

    notification.log();
  },
};
</script>
