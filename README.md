# vue3-notifier

vue3-notifier is a powerful notification plugin with a very easy to use interface and high customizability as we gonna discuss in the rest of documentation.

## Installation

```sh
# Using yarn
yarn add vue3-notifier

# Using npm
npm i vue3-notifier --save
```

## Usage

```ts
// main.ts
import { createApp } from 'vue';
import { useNotifierPlugin } from 'vue3-notifier';

import App from './App.vue';

createApp(App)
  .use(useNotifierPlugin())

  .mount('#app');
```

```ts
// App.vue
import { useNotifier } from 'vue3-notifier';

const notifier = useNotifier();
notifier.notify();
```

## Examples

examples

## API Documentation

Note: All props are optionals as the plugin provide a default value for every prop so that you only need to pass as minial config as possible.

#### NotifierPluginOptions

| Prop                   | type                                                                                                                                                      | default                 | Description                                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| id                     | _`String`_                                                                                                                                                | **"default"**           | **id** is used while initializing `useNotifierPlugin` which provide a unique key to allow using plugin more than once.                          |
| timeout                | _`number`_                                                                                                                                                | **3_000**               | A number in ms that indicates the time before the notifiction gets destroied.                                                                   |
| persistent             | _`boolean`_                                                                                                                                               | **false**               | Indicates that notification shouldn't be automatically destroied.                                                                               |
| newOnTop               | _`boolean`_                                                                                                                                               | **false**               | Indicates new notifications should be on top or not.                                                                                            |
| maxNotifictions        | _`number`_                                                                                                                                                | **3**                   | Max allowed number of notifictions to be shown at once on screen.                                                                               |
| component              | _`NotifierComponent`_                                                                                                                                     | **DefaultNotifier.vue** | A vue component which will be rendered as a notifiction.                                                                                        |
| props                  | _`Record<string, any>`_                                                                                                                                   | **{}**                  | Extra props to be passed to notification component.                                                                                             |
| plugins                | _`Plugin[]`_                                                                                                                                              | **[]**                  | A set of plugins which injected to notifier app.                                                                                                |
| showProgressBar        | _`boolean`_                                                                                                                                               | **false**               | Toggle visability; true -> visible, false -> hidden.                                                                                            |
| closable               | _`boolean`_                                                                                                                                               | **true**                | Toggle visability of close button.                                                                                                              |
| pauseOnHover           | _`boolean`_                                                                                                                                               | **true**                | Toggle pausing time when user hover over notification; this is extremly useful to improve ux.                                                   |
| position               | _`'top' \| 'top center' \| 'top left' \| 'top right' \| 'bottom' \| 'bottom center' \| 'bottom left' \| 'bottom right' \| 'center' \| 'center center'  `_ | **"bottom right"**      | Indicates position of notifications container.                                                                                                  |
| closeButton            | _`NotifierComponent`_                                                                                                                                     | **DefaultCloseBtn.vue** | A vue component that will be used as a close button.                                                                                            |
| showCloseButtonOnHover | _`boolean`_                                                                                                                                               | **false**               | If true then close button will be hidden untill the user hover over notification.                                                               |
| debug                  | _`boolean`_                                                                                                                                               | **false**               | Enables some logs for debugging (recommended to be enabled in development `import.meta.env.DEV` \|\| `process.env.NODE_ENV === 'development'`). |
| silent                 | _`boolean`_                                                                                                                                               | **false**               | Avoid throwing error while initializing if something went wrong.                                                                                |
| logger                 | _`Partial<NotifierLogger>`_                                                                                                                               | **logger**              | Logger which will be used in debug mode.                                                                                                        |
| containerOffset        | _`number`_                                                                                                                                                | **20**                  | Offset between container holding notifications and the edges of the screen (in px).                                                             |
| containerWidth         | _`number`_                                                                                                                                                | **350**                 | Notifications' container width (in px).                                                                                                         |
| containerClassList     | _`string[]`_                                                                                                                                              | **[]**                  | Classlist will be appended to notifications' container.                                                                                         |
| containerStyles        | _`StyleValue`_                                                                                                                                            | **{}**                  | Styles will be added to notifications' container.                                                                                               |
| notificationOffset     | _`number`_                                                                                                                                                | **20**                  | Gap between each notification.                                                                                                                  |
| notificationClassList  | _`string[]`_                                                                                                                                              | **[]**                  | ClassList will be appended to each notification.                                                                                                |
| notificationStyles     | _`StyleValue`_                                                                                                                                            | **{}**                  | Styles will be added to each notification.                                                                                                      |
| hideAllButton          | _`NotifierComponent`_                                                                                                                                     | **HideAllBtn.vue**      | Append a button which hide all notfications.                                                                                                    |
| showHideAllButton      | _`boolean`_                                                                                                                                               | **true**                | Toggle visability of hide all button.                                                                                                           |

#### NotifierOptions

Note: The following props are exactly the same as above so we won't mention them in `NotifierOptions` api.

`timeout`,
`persistent`,
`component`,
`props`,
`showProgressBar`,
`closable`,
`pauseOnHover`,
`closeButton`,
`showCloseButtonOnHover`,
`notificationClassList`,
`notificationStyles`.

| prop        | type                                                         | default             | description                                                    |
| ----------- | ------------------------------------------------------------ | ------------------- | -------------------------------------------------------------- |
| title       | _`string`_                                                   | **""**              | Title to show on notifiction supports html.                    |
| description | _`string`_                                                   | **""**              | Text to be render in notifiction supports html.                |
| showIcon    | _`boolean`_                                                  | **true**            | Toggle icon visability; true -> show icon, false -> hide icon. |
| icon        | _`NotifierComponent`_                                        | **DefaultIcon.vue** | A vue to be used as notificaiton's icon.                       |
| type        | _`'default' \| 'info' \| 'warning' \| 'success' \| 'error'`_ | **"default"**       | type of the notification.                                      |

#### NotifierService

| method              | params                                | returns                                              | description                                                                                                                                       |
| ------------------- | ------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| updatePluginOptions | _`(options?: NotifierPluginOptions)`_ | _`void`_                                             | Allow to update plugin options after initializing; Note: not all options can be updates as they require reinitializing the plugin (e.g: plugins). |
| notify              | _`(options?: NotifierOptions)`_       | _`Required<NotifierOptions & NotifierExtraOptions>`_ | Open a new notification with the specified options.                                                                                               |
| destroy             | _`(id: number)`_                      | _`boolean`_                                          | Destroy notification using it's id.                                                                                                               |
| destroyAll          | _`()`_                                | _`void`_                                             | Destroy all notifications in that specific app.                                                                                                   |

#### Props Helpers

| method                   | propName          | type                                                 | description                             |
| ------------------------ | ----------------- | ---------------------------------------------------- | --------------------------------------- |
| makePluginOptionsProps   | _pluginOptions_   | _`Required<NotifierPluginOptions>`_                  | Defines prop for plugin global options. |
| makeNotifierServiceProps | _notifierService_ | _`NotifierService`_                                  | Desfines prop for notifier service.     |
| makeNotificationProps    | _notification_    | _`Required<NotifierOptions & NotifierExtraOptions>`_ | Defines prop for notification.          |

Note: `makeNotifierProps` is a combine of the 3 above methods.

#### Composables

| method            | params                                | return              | description                                                |
| ----------------- | ------------------------------------- | ------------------- | ---------------------------------------------------------- |
| useNotifierPlugin | _`(options?: NotifierPluginOptions)`_ | _`Plugin`_          | Creates a new notifier app with specific id.               |
| useNotifier       | _`(id: string = 'default')`_          | _`NotifierService`_ | Get the service of the notifier app with that specific id. |

#### Hooks

| hook            | params                                                                                                                              | return                                                                               | description                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| useDestroyTimer | _`(options: Required<NotifierOptions & NotifierExtraOptions>,globalOptions: Required<NotifierPluginOptions>,onFinish: () => void)`_ | _`ComputedRef<{value: number;pauseTimeout: () => void;resumeTimeout: () => void }>`_ | A helper hook to count down for timeout of destroying a notification also providing pause/resume method to allow stop/continue of timeout. |
