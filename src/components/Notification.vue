<template>
<div class="is-fixed">
    <div class="notification" :class="{ 'is-danger': type === 'error', 'is-success': type === 'success' }">
        <button @click="hide" class="delete"></button>
        <slot></slot>
    </div>
</div>
</template>

<script>
import EventBus from '@/bus';

export default {
  name: "Notification",
  props: {
    type: {
      required: true,
      type: String
    }
  },
  methods: {
    hide() {
      EventBus.$emit("HIDE_NOTIFICATION");
    }
  }
};
</script>
