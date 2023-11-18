import { createApp } from 'vue';

import NotifierExample from './NotifierExample.vue';
import { useNotifierPlugin } from '../lib';

createApp(NotifierExample)
  .use(
    useNotifierPlugin({
      debug: process.env.NODE_ENV === 'development',
      containerClassList: ['h1', 'h2'],
      showProgressBar: true,
    }),
  )
  .use(
    useNotifierPlugin({
      id: 'x',
      position: 'bottom left',
    }),
  )

  .mount('#example');
