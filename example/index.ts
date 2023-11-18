import { createApp } from 'vue';

import NotifierExample from './NotifierExample.vue';
import { useNotifierPlugin } from '../lib';

createApp(NotifierExample)
  .use(
    useNotifierPlugin({
      debug: process.env.NODE_ENV === 'development',
      containerClassList: ['h1', 'h2'],
      showProgressBar: true,
      persistent: true,
      showHideAllButton: true,
      newOnTop: true,
      props: { greeting: 'hello world' },
    }),
  )
  .use(
    useNotifierPlugin({
      id: 'x',
      position: 'bottom left',
      persistent: true,
    }),
  )
  .use(
    useNotifierPlugin({
      id: 'y',
      position: 'top',
      persistent: true,
      showHideAllButton: true,
    }),
  )
  .use(
    useNotifierPlugin({
      id: 'yb',
      position: 'bottom',
      persistent: true,
      showHideAllButton: true,
    }),
  )
  .use(
    useNotifierPlugin({
      id: 'c',
      position: 'center',
      persistent: true,
      showHideAllButton: true,
    }),
  )

  .mount('#example');
