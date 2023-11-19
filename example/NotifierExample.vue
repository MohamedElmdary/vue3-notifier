<template>NotifierExample</template>

<script lang="ts">
import { onMounted } from 'vue';
import { useNotifier } from '../lib';

export default {
  name: 'NotifierExample',
  setup() {
    const customNotifier = useNotifier('custom');

    onMounted(main);
    async function main() {
      const types = ['default', 'error', 'info', 'warning', 'success'];
      const type = types[Math.ceil(Math.random() * types.length - 1)] as any;

      customNotifier.notify({
        title: 'Custom notification',
        description: 'This is awsome custom notification',
        type,
      });

      setTimeout(main, 520);
    }
  },
};
</script>
