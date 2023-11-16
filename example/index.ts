import { createApp } from 'vue';

import NotifierExample from './NotifierExample.vue';
import { useNotifierPlugin } from '../lib';

createApp(NotifierExample)
  .use(useNotifierPlugin({}))

  .mount('#example');
