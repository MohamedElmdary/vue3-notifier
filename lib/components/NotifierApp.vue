<template>
  <div :style="[positionStyles, { height: '100px', width: '100px', background: 'red' }]"></div>
</template>

<script lang="ts">
import { computed, type PropType } from 'vue';
import type { DeepRequired as DR } from 'utility-types';

import type { NotifierPluginOptions, NotifierService } from '../types';
import { getPositionStyles } from '../utils';

export default {
  name: 'NotifierApp',
  props: {
    options: {
      type: Object as PropType<DR<NotifierPluginOptions>>,
      required: true,
    },
  },
  setup({ options }, ctx) {
    const positionStyles = computed(() => getPositionStyles(options.position, options.containerOffset));

    const service: NotifierService = {
      notify(options) {
        console.log(options);
        return {};
      },
    };
    ctx.expose(service);

    return { positionStyles };
  },
};
</script>
