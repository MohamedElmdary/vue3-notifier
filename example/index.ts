import { createApp } from 'vue';

import NotifierExample from './NotifierExample.vue';

import { useNotifierPlugin } from '../lib';

createApp(NotifierExample)
  .use(
    useNotifierPlugin({
      id: 'custom',
      closable: true,
      containerClassList: ['c1', 'c2', 'c3 c4'],
      containerOffset: 15,
      containerStyles: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
      containerWidth: 400,
      debug: process.env.NODE_ENV === 'development',
      maxNotifictions: 8,
      newOnTop: false,
      notificationClassList: ['n1', 'n2', 'n3 n4'],
      notificationOffset: 15,
      notificationStyles: { borderBottom: '1px solid red' },
      pauseOnHover: true,
      persistent: false,
      plugins: [],
      position: 'top right',
      props: {},
      showCloseButtonOnHover: false,
      showHideAllButton: false,
      showProgressBar: true,
      silent: false,
      timeout: 3_000,

      closeButton: undefined,
      component: undefined,
      hideAllButton: undefined,
      logger: {},
    }),
  )
  .mount('#example');
