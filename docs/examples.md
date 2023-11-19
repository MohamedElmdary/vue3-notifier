# vue3-notifier

## Examples

Some Example for vue3 notifier

### 1. Basic Usage

![Basic Usage Video](./examples/basic-example.mp4)

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
