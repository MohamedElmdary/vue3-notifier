# vue3-notifier

## Examples

Some Example for vue3 notifier

### 1. Basic Usage

![Basic Usage Video](examples/basic-example.gif)

```ts
// main.ts
import 'vue3-notifier/style.css';

import { createApp } from 'vue';
import { useNotifierPlugin } from 'vue3-notifier';

import App from './App.vue';

createApp(App)
  .use(useNotifierPlugin())

  .mount('#app');
```

```vue
<!-- App.vue -->
<script lang="ts" setup>
import { useNotifier } from 'vue3-notifier';

const notifier = useNotifier();
notifier.notify({
  title: 'Basic Example',
  description: 'This is the most basic example',
});
</script>
```

### 2. Custom Config

![Custom Config Video](examples/custom-config-example.gif)

```ts
// main.ts
import 'vue3-notifier/style.css';

import { createApp } from 'vue';
import { useNotifierPlugin } from 'vue3-notifier';

import App from './App.vue';

createApp(App)
  .use(
    useNotifierPlugin({
      id: 'custom',
      showProgressBar: true,
      timeout: 5_000,
      closable: false,
      pauseOnHover: false,
      maxNotifictions: 6,
    }),
  )

  .mount('#app');
```

```vue
<!-- App.vue -->
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useNotifier } from 'vue3-notifier';

const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

const notifier = useNotifier('custom');

onMounted(runDemo);
async function runDemo() {
  await delay();

  notifier.notify({
    title: 'Custom Config Basic Notification',
    description: 'Description of Custom Config Basic Notification',
  });

  notifier.notify({
    title: 'Custom Config Ifno Notification',
    description: 'Description of Custom Config Ifno Notification',
    type: 'info',
    closable: false,
  });

  await delay();

  notifier.notify({
    title: 'Custom Config Error Notification',
    description: 'Description of Custom Config Error Notification',
    type: 'error',
  });

  await delay();

  notifier.notify({
    title: 'Custom Config Warning Notification',
    description: 'Description of Custom Config Warning Notification',
    type: 'warning',
    showProgressBar: false,
  });

  await delay(1_000);

  notifier.notify({
    title: 'Custom Config Success Notification',
    description: 'Description of Custom Config Success Notification',
    type: 'success',
    persistent: true,
    closable: true,
  });
}
</script>
```

### 3. Multiple notifiers

![Multiple Notifier Video](examples/multi-notifier-example.gif)

```ts
// main.ts
import 'vue3-notifier/style.css';

import { createApp } from 'vue';
import { useNotifierPlugin } from 'vue3-notifier';

import App from './App.vue';

createApp(App)
  .use(
    useNotifierPlugin({
      id: 'right',
      position: 'bottom right',
    }),
  )
  .use(
    useNotifierPlugin({
      id: 'left',
      position: 'bottom left',
    }),
  )
  .use(
    useNotifierPlugin({
      id: 'top',
      position: 'top', // same as "top center"
    }),
  )

  .mount('#app');
```

```vue
<!-- App.vue -->
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useNotifier } from 'vue3-notifier';

const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

const notifierRight = useNotifier('right');
const notifierLeft = useNotifier('left');
const notifierTop = useNotifier('top');

onMounted(runDemo);
async function runDemo() {
  await delay();

  notifierRight.notify({
    title: 'This is notifier right',
    description: 'Notification #1 from notifierRight',
    showProgressBar: true,
    timeout: 7_000,
    type: 'info',
  });

  await delay();

  notifierLeft.notify({
    title: 'This is notifier left',
    description: 'Notification #2 from notifierLeft',
    showProgressBar: true,
    type: 'info',
  });

  await delay();

  notifierRight.notify({
    title: 'This is notifier right',
    description: 'Notification #3 from notifierRight',
    showProgressBar: true,
    type: 'warning',
  });

  await delay();

  notifierTop.notify({
    title: 'This is notifier top',
    description: 'Notification #3 from notifierTop',
    notificationStyles: {
      boxShadow: '0 0 16px red',
    },
  });

  await delay();

  notifierLeft.notify({
    title: 'This is notifier left',
    description: 'Notification #2 from notifierLeft',
    showProgressBar: true,
    type: 'error',
  });

  await delay();

  notifierTop.notify({
    title: 'This is notifier top',
    description: 'Notification #3 from notifierTop',
    type: 'success',
  });
}
</script>
```
