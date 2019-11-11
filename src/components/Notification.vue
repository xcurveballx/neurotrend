<template>
<div class="is-fixed">
    <div v-for="notification in Array.from(notifications)" :key="notification.id" class="notification" :class="{ 'is-danger': notification.type === 'error', 'is-success': notification.type === 'success' }">
        <button @click="remove(notification.id)" class="delete"></button>
        {{ notification.message }}
    </div>
</div>
</template>

<script>
import EventBus from '@/bus';

export default {
  name: "Notification",
  props: {
    notifications: {
      required: true,
      type: Map
    }
  },
  methods: {
    remove(id) {
      EventBus.$emit("REMOVE_NOTIFICATION", id);
    }
  }
};
</script>
