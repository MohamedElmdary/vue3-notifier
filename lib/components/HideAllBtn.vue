<template>
  <button class="vue3-notifier-hide-all-button" @click="$props.notifierService.destroyAll()">HideAllBtn</button>
</template>

<script lang="ts">
import { makeNotifierServiceProps } from '../props';

export default {
  name: 'HideAllBtn',
  props: makeNotifierServiceProps(),
};
</script>

<style scoped lang="scss">
.vue3-notifier-hide-all-button {
  background-color: #424242;
  color: white;
  border: none;
  padding: 10px 0;
  text-align: center;
  width: 100%;
  font-size: 16px;
  outline: none;
  cursor: pointer;
}
</style>
