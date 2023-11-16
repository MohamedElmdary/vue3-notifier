import { createApp } from 'vue';

import NotifierExample from './NotifierExample.vue';
import { useNotifierPlugin } from '../lib';

createApp(NotifierExample)
  .use(
    useNotifierPlugin({
      debug: process.env.NODE_ENV === 'development',
    }),
  )

  .mount('#example');
