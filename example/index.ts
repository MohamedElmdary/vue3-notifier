import { createApp } from 'vue';

import NotifierExample from './NotifierExample.vue';
import { useNotifierPlugin } from '../lib';

createApp(NotifierExample)
  .use(useNotifierPlugin({ timeout: 0 }))

  .mount('#example');
