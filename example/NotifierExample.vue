<template>NotifierExample</template>

<script lang="ts">
import { onMounted } from 'vue';
import { useNotifier } from '../lib';

const delay = (timeout = 550) => new Promise((res) => setTimeout(res, timeout));

export default {
  name: 'NotifierExample',
  setup() {
    const notifier = useNotifier();

    notifier.destroyAll();

    notifier.notify({
      pauseOnHover: true,
      title: 'title',
      description: 'description',
      persistent: false,
    });

    // onMounted(async () => {
    //   let a = notifier.notify({
    //     title: 'Failed to deploy vm',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   });

    //   await delay();

    //   let b = notifier.notify({
    //     title: 'Failed to deploy vm',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //     type: 'info',
    //   });

    //   await delay();

    //   let c = notifier.notify({
    //     title: 'Failed to deploy vm',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //     type: 'error',
    //   });

    //   await delay();

    //   let d = notifier.notify({
    //     title: 'Failed to deploy vm',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //     type: 'success',
    //   });

    //   await delay();

    //   let e = notifier.notify({
    //     title: 'Failed to deploy vm',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //     type: 'warning',
    //   });

    //   await delay();

    //   d.destroy();

    //   await delay(1500);

    //   notifier.updatePluginOptions({ position: 'top right' });

    //   await delay();

    //   notifier.notify({
    //     title: 'Failed to deploy vm',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //     type: 'success',
    //   });

    //   await delay();

    //   b.destroy();

    //   await delay(1500);

    //   notifier.updatePluginOptions({ position: 'bottom left' });

    //   await delay();

    //   notifier.notify({
    //     title: 'Failed to deploy vm',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //     type: 'info',
    //   });

    //   await delay();

    //   a.destroy();

    //   await delay(1500);

    //   notifier.updatePluginOptions({ position: 'top left' });

    //   await delay();

    //   let f = notifier.notify({
    //     title: 'Failed to deploy vm',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   });

    //   await delay();

    //   c.destroy();

    //   await delay(1500);

    //   notifier.updatePluginOptions({ position: 'top' });

    //   await delay();

    //   notifier.notify({
    //     title: 'Failed to deploy vm',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //     type: 'error',
    //   });

    //   await delay();

    //   e.destroy();

    //   await delay(1500);

    //   notifier.updatePluginOptions({ position: 'bottom' });

    //   await delay();

    //   notifier.notify({
    //     title: 'Failed to deploy vm',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //     type: 'warning',
    //   });

    //   await delay();

    //   f.destroy();

    //   await delay(1500);

    //   notifier.updatePluginOptions({ position: 'center' });

    //   await delay();

    //   notifier.notify({
    //     title: 'Failed to deploy vm',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   });

    //   await delay(1500);

    //   notifier.destroyAll();
    // });

    // console.log(notifier);

    // const notifierX = useNotifier('x');
    // const notifierY = useNotifier('y');
    // const notifierYb = useNotifier('yb');
    // const notifierC = useNotifier('c');

    // notifierC.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   showCloseButtonOnHover: true,
    // });

    // notifierC.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   type: 'success',
    //   closable: false,
    // });

    // notifierX.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   showCloseButtonOnHover: true,
    // });

    // notifierX.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   type: 'success',
    //   closable: false,
    // });

    // notifierYb.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   showCloseButtonOnHover: true,
    // });

    // notifierYb.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   type: 'success',
    //   closable: false,
    // });

    // notifierY.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   showCloseButtonOnHover: true,
    // });

    // notifierY.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   type: 'success',
    //   closable: false,
    // });

    // notifier.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   showCloseButtonOnHover: true,
    // });

    // notifier.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   type: 'success',
    //   closable: false,
    // });

    // notifier.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   type: 'info',
    // });

    // notifier.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   type: 'error',
    // });

    // notifier.notify({
    //   title: 'Failed to deploy vm',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est ipsam, architecto dolorem et ad facere.',
    //   type: 'warning',
    //   showProgressBar: true,
    //   persistent: false,
    // });
    // notification.log();
  },
};
</script>
