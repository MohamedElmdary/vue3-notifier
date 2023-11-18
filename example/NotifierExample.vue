<template>NotifierExample</template>

<script lang="ts">
import { useNotifier } from '../lib';

export default {
  name: 'NotifierExample',
  setup() {
    const notifier = useNotifier();
    const notifierX = useNotifier('x');

    notifierX.notify({
      title: 'Failed to deploy vm',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
      showCloseButtonOnHover: true,
    });

    notifierX.notify({
      title: 'Failed to deploy vm',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
      type: 'success',
      closable: false,
    });

    console.log({ notifier });

    notifier.notify({
      title: 'Failed to deploy vm',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
      showCloseButtonOnHover: true,
    });

    notifier.notify({
      title: 'Failed to deploy vm',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
      type: 'success',
      closable: false,
    });

    notifier.notify({
      title: 'Failed to deploy vm',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
      type: 'info',
    });

    notifier.notify({
      title: 'Failed to deploy vm',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
      type: 'error',
    });

    notifier.notify({
      title: 'Failed to deploy vm',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
      type: 'warning',
      showProgressBar: true,
      persistent: false,
    });
    // notification.log();
  },
};
</script>
