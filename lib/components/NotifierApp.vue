<template>NotifierApp</template>

<script lang="ts">
import { NotifierService } from '../types';

export default {
  name: 'NotifierApp',
  setup(_, { expose }) {
    const service: NotifierService = {
      notify(options) {
        return {
          log() {
            console.log(options, 'hello world');
          },
        };
      },
    };

    expose(service);
  },
};
</script>
