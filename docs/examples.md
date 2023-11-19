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
